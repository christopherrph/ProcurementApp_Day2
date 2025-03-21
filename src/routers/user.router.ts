import { Router } from "express";
import userController from "../controllers/user.controller";
import validatorMiddleware from "../middlewares/validator.middleware";
import { createUserSchema } from "../schemas/user.schema";
import { Multer } from "../utils/multer";

const router = Router();

//Register
router.post("/register",Multer().single("avatar"), validatorMiddleware(createUserSchema), userController.register); 
//Multer always before validator so that the file can be validated, multer make sure req.body is parsed first before the validation

//Login
router.post("/login", userController.login);

export default router;