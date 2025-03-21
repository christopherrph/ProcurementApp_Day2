"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const purchaserequest_service_1 = __importDefault(require("../services/purchaserequest.service"));
const item_service_1 = __importDefault(require("../services/item.service"));
function createPurchaseRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { quantity, status, item } = req.body;
            const checkitem = yield item_service_1.default.getItemById(item.id);
            if (!checkitem) {
                res.status(404).json({
                    message: "Item not found"
                });
                throw new Error("Item not found");
            }
            if (checkitem.stock < quantity) {
                res.status(400).json({
                    message: "Stock is not enough"
                });
                throw new Error("Stock is not enough");
            }
            const newPurchaseRequest = yield purchaserequest_service_1.default.createPurchaseRequest({ quantity, status, item });
            const updatedItem = yield item_service_1.default.updateItem(item.id, { name: checkitem.name, category: checkitem.category, stock: checkitem.stock - quantity });
            let message = "Purchase request created successfully and item updated";
            if (!updatedItem) {
                message = "Purchase request created successfully but item not updated";
            }
            if (updatedItem && updatedItem.stock < 10) {
                message = "Purchase request created successfully and item updated, stock is less than 10";
            }
            res.status(201).json({
                message,
                data: newPurchaseRequest,
                updatedItem
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function getAllPurchaseRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchaseRequests = yield purchaserequest_service_1.default.getAllPurchaseRequest();
            res.status(200).json({
                message: "Get all purchase requests",
                data: purchaseRequests
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
            next(err);
        }
    });
}
function getPurchaseRequestById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const purchaseRequest = yield purchaserequest_service_1.default.getPurchaseRequestById(id);
            if (!purchaseRequest) {
                res.status(404).json({
                    message: "Purchase request not found"
                });
                throw new Error("Purchase request not found");
            }
            res.status(200).json({
                message: "Get purchase request by id",
                data: purchaseRequest
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
            next(err);
        }
    });
}
function editPurchaseRequestById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const purchaseRequest = yield purchaserequest_service_1.default.getPurchaseRequestById(id);
            if (!purchaseRequest) {
                res.status(404).json({
                    message: "Purchase request not found"
                });
                throw new Error("Purchase request not found");
            }
            const updatedPurchaseRequest = yield purchaserequest_service_1.default.editPurchaseRequestById(id, status);
            res.status(200).json({
                message: "Purchase request updated successfully",
                data: updatedPurchaseRequest
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
            next(err);
        }
    });
}
const controller = { createPurchaseRequest, getAllPurchaseRequest, getPurchaseRequestById, editPurchaseRequestById };
exports.default = controller;
