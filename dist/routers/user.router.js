"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const user_schema_1 = require("../schemas/user.schema");
const multer_1 = require("../utils/multer");
const router = (0, express_1.Router)();
//Register
router.post("/register", (0, multer_1.Multer)().single("avatar"), (0, validator_middleware_1.default)(user_schema_1.createUserSchema), user_controller_1.default.register);
//Multer always before validator so that the file can be validated, multer make sure req.body is parsed first before the validation
//Login
router.post("/login", user_controller_1.default.login);
exports.default = router;
