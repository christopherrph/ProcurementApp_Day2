"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const cloudinary_1 = require("../utils/cloudinary");
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepository = data_source_1.purwadhikaDB.getRepository(user_entity_1.User);
            const user = yield userRepository.findOne({
                where: {
                    email
                }
            });
            return user;
        }
        catch (err) {
            throw err;
        }
    });
}
function register(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, email, password, file }) {
        try {
            const checkemail = yield findUserByEmail(email);
            if (checkemail) {
                throw new Error("Email already exists");
            }
            let avatar = "";
            if (file) {
                const { secure_url } = yield (0, cloudinary_1.cloudinaryUpload)(file);
                avatar = secure_url;
            }
            const newUser = new user_entity_1.User();
            const salt = yield (0, bcrypt_1.genSalt)(10);
            const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
            console.log(hashedPassword);
            console.log(salt);
            yield data_source_1.purwadhikaDB.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                newUser.name = name;
                newUser.email = email;
                newUser.password = hashedPassword;
                newUser.lastUpdated = new Date();
                newUser.avatar = avatar;
                yield t.save(newUser);
            }));
            return newUser;
        }
        catch (err) {
            throw err;
        }
    });
}
function login(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, password }) {
        try {
            const user = yield findUserByEmail(email);
            if (!user) {
                throw new Error("User not found");
            }
            const isMatch = yield (0, bcrypt_1.compare)(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid password");
            }
            const payload = {
                email: user.email,
                name: user.name,
                role: user.role
            };
            const accesstoken = (0, jsonwebtoken_1.sign)(payload, "secret", { expiresIn: "1h" });
            const sessiontoken = (0, jsonwebtoken_1.sign)(payload, "secret", { expiresIn: "5m" });
            return { accesstoken, sessiontoken, user };
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = { findUserByEmail, register, login };
