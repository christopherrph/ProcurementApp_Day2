import { purwadhikaDB } from "../data-source";
import { User } from "../entities/user.entity";
import { RegisterParams, LoginParams } from "../interfaces/user.interface";
import { genSalt, hash, compare } from "bcrypt";
import jwt, {sign} from "jsonwebtoken";
import { cloudinaryUpload } from "../utils/cloudinary";

async function findUserByEmail(email: string) {
    try {
        const userRepository = purwadhikaDB.getRepository(User);
        const user = await userRepository.findOne({
            where: {
                email
            }
        });
        return user;
    } catch (err: any) {
        throw err;
    }
}

async function register({ name, email, password, file }: RegisterParams) {
    try {
        const checkemail = await findUserByEmail(email);
        if (checkemail) {
            throw new Error("Email already exists");
        }

        let avatar = "";
        if(file){
            const {secure_url} = await cloudinaryUpload(file);
            avatar = secure_url;
        }

        const newUser = new User();
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        console.log(hashedPassword);
        console.log(salt);
        
        await purwadhikaDB.transaction(async (t) => {
            newUser.name = name;
            newUser.email = email;
            newUser.password = hashedPassword;
            newUser.lastUpdated = new Date();
            newUser.avatar = avatar;

            await t.save(newUser);
        })

        return newUser;

    } catch (err: any) {
        throw err;
    }
}

async function login({ email, password }: LoginParams) {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }

        const payload = {
            email: user.email,
            name: user.name,
            role: user.role
        }

        const accesstoken = sign(payload, "secret", { expiresIn: "1h" });
        const sessiontoken = sign(payload, "secret", { expiresIn: "5m" });
        return { accesstoken, sessiontoken, user };
    } catch (err: any) {
        throw err;
    }
}

export default { findUserByEmail, register, login };