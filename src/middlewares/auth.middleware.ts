import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PayloadParams } from "../custom";

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try{
        const token = req.header("Authorization");
        if(!token) throw new Error("Token not found");

        const checktoken = jwt.verify(token, "secret");
        if(!checktoken) throw new Error("Invalid token");

        req.user = checktoken as PayloadParams; // casting checktoken to PayloadParams biar req.user bisa diakses di controller
        next();
    }
    catch(err: any){
        res.status(401).json({message: err.message});
    }
}

export function roleCheck(PermittedRole: string[]) {
    return function(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.user as PayloadParams;
            if (!PermittedRole.includes(role)) throw new Error("Unauthorized Access");
            next();
        } catch (err: any) {
            res.status(401).json({ message: err.message });
        }
    }
}
