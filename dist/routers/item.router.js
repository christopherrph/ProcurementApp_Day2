"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const item_schema_1 = require("../schemas/item.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.verifyToken, (0, auth_middleware_1.roleCheck)(["USER", "MANAGER"]), item_controller_1.default.getAllItem); // add verifyToken and roleCheck middleware
router.post("/", (0, validator_middleware_1.default)(item_schema_1.createItemSchema), item_controller_1.default.createItem);
router.get("/:id", item_controller_1.default.getItemById);
router.patch("/:id", item_controller_1.default.updateItem);
router.delete("/:id", item_controller_1.default.deleteItem);
exports.default = router;
