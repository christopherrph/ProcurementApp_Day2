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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password } = req.body;
            const { file } = req;
            const newUser = yield user_service_1.default.register({ name, email, password, file });
            res.status(201).json({
                message: "User registered successfully",
                data: newUser
            });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
            next(err);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_service_1.default.login({ email, password });
            res.status(200).cookie("accress_token", user.accesstoken).json({
                message: "Login successful",
                session_token: user.sessiontoken,
                user: user.user
            });
        }
        catch (err) {
            res.status(401).json({ message: err.message });
            next(err);
        }
    });
}
const controller = { register, login };
exports.default = controller;
