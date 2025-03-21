import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        const { file } = req;
        const newUser = await UserService.register({ name, email, password, file });
        res.status(201).json({
            message: "User registered successfully",
            data: newUser
        });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
        next(err);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body;
        const user = await UserService.login({ email, password });
        res.status(200).cookie("accress_token", user.accesstoken).json({
            message: "Login successful",
            session_token: user.sessiontoken,
            user: user.user
        });

    } catch (err: any) {
        res.status(401).json({ message: err.message });
        next(err);
    }
}



const controller = { register, login };
export default controller;