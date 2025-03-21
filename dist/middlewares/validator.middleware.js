"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validatorMiddleware;
const zod_1 = require("zod");
function validatorMiddleware(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const message = err.errors.map((issue) => ({
                    message: issue.message
                }));
                res.status(400).json({ message: "Validation error", issues: message });
            }
            else {
                next(err);
            }
        }
    };
}
// Used for validating request body and sanitize it before it reaches the controller
