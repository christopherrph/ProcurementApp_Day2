"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().trim().nonempty("Name must not be empty"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters long"),
    email: zod_1.z.string().email("Invalid email format")
});
