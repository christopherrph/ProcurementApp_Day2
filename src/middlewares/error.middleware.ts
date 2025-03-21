import { error } from "console";
import { NextFunction, Request, Response } from "express";

export class httpexception extends Error {
    public status: number;
    public message: string;
    
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export const ErrorMiddleware = (
    err: httpexception, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try{
        const status = err.status || 500;
        const message = err.message || "Something went wrong";
        res.status(status).send({ 
            message 
        });
    }
    catch(err){
        next(err);
    }
}

