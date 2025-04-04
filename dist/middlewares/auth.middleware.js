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
exports.verifyToken = verifyToken;
exports.roleCheck = roleCheck;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.header("Authorization");
            if (!token)
                throw new Error("Token not found");
            const checktoken = jsonwebtoken_1.default.verify(token, "secret");
            if (!checktoken)
                throw new Error("Invalid token");
            req.user = checktoken; // casting checktoken to PayloadParams biar req.user bisa diakses di controller
            next();
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    });
}
function roleCheck(PermittedRole) {
    return function (req, res, next) {
        try {
            const { role } = req.user;
            if (!PermittedRole.includes(role))
                throw new Error("Unauthorized Access");
            next();
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    };
}
