import { Router } from "express";
import PurchaseRequestController from "../controllers/purchaserequest.controller";

const router = Router();

router.get("/", PurchaseRequestController.getAllPurchaseRequest);
router.post("/", PurchaseRequestController.createPurchaseRequest);
router.get("/:id", PurchaseRequestController.getPurchaseRequestById);
router.patch("/:id", PurchaseRequestController.editPurchaseRequestById);

export default router;