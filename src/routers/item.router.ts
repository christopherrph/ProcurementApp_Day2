import { Router } from "express";
import ItemController from "../controllers/item.controller";
import validatorMiddleware from "../middlewares/validator.middleware";
import { createItemSchema } from "../schemas/item.schema";
import { verifyToken, roleCheck } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", verifyToken, roleCheck(["USER", "MANAGER"]), ItemController.getAllItem); // add verifyToken and roleCheck middleware
router.post("/", validatorMiddleware(createItemSchema) ,ItemController.createItem);   
router.get("/:id", ItemController.getItemById);
router.patch("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);

export default router;