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
const item_service_1 = __importDefault(require("../services/item.service"));
function createItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, category, stock } = req.body;
            const newItem = yield item_service_1.default.createItem({ name, category, stock });
            res.status(201).json({
                message: "Item created successfully",
                data: newItem
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function getAllItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filter } = req.query;
            const items = yield item_service_1.default.getAllItem(filter);
            res.status(200).json({
                message: "Get all items",
                data: items
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function getItemById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const item = yield item_service_1.default.getItemById(id);
            res.status(200).json({
                message: "Get item by id",
                data: item
            });
        }
        catch (err) {
            res.status(404).json({
                message: "Item not found"
            });
            next(err);
        }
    });
}
function updateItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, category, stock } = req.body;
            const updatedItem = yield item_service_1.default.updateItem(id, { name, category, stock });
            if (!updatedItem) {
                res.status(404).json({
                    message: "Item not found"
                });
            }
            res.status(200).json({
                message: "Item updated successfully",
                data: updatedItem
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function deleteItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedItem = yield item_service_1.default.deleteItem(id);
            if (!deletedItem) {
                res.status(404).json({
                    message: "Item not found"
                });
            }
            res.status(200).json({
                message: "Item deleted successfully",
                data: deletedItem
            });
        }
        catch (err) {
            next(err);
        }
    });
}
const controller = { createItem, getAllItem, getItemById, updateItem, deleteItem };
exports.default = controller;
