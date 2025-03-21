import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export default function validatorMiddleware(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            if(err instanceof ZodError){
                const message = err.errors.map((issue: any) => ({
                    message: issue.message
                }));  
                res.status(400).json({message: "Validation error", issues: message});
            }
            else{
                next(err);
            }
        }
    }
}

// Used for validating request body and sanitize it before it reaches the controller