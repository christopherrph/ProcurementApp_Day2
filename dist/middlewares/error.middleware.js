"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = exports.httpexception = void 0;
class httpexception extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.httpexception = httpexception;
const ErrorMiddleware = (err, req, res, next) => {
    try {
        const status = err.status || 500;
        const message = err.message || "Something went wrong";
        res.status(status).send({
            message
        });
    }
    catch (err) {
        next(err);
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
