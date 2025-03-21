"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaserequest_controller_1 = __importDefault(require("../controllers/purchaserequest.controller"));
const router = (0, express_1.Router)();
router.get("/", purchaserequest_controller_1.default.getAllPurchaseRequest);
router.post("/", purchaserequest_controller_1.default.createPurchaseRequest);
router.get("/:id", purchaserequest_controller_1.default.getPurchaseRequestById);
router.patch("/:id", purchaserequest_controller_1.default.editPurchaseRequestById);
exports.default = router;
