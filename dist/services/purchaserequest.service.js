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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const purchaserequest_entity_1 = require("../entities/purchaserequest.entity");
function createPurchaseRequest(_a) {
    return __awaiter(this, arguments, void 0, function* ({ quantity, status, item }) {
        try {
            const newPurchaseRequest = new purchaserequest_entity_1.PurchaseRequest();
            yield data_source_1.purwadhikaDB.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                newPurchaseRequest.quantity = quantity;
                newPurchaseRequest.status = status;
                newPurchaseRequest.requestDate = new Date();
                newPurchaseRequest.item = item;
                yield t.save(newPurchaseRequest);
            }));
            return newPurchaseRequest;
        }
        catch (err) {
            throw err;
        }
    });
}
function getAllPurchaseRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchaseRequestRepository = data_source_1.purwadhikaDB.getRepository(purchaserequest_entity_1.PurchaseRequest);
            const purchaseRequests = yield purchaseRequestRepository.find({ relations: ["item"] });
            return purchaseRequests;
        }
        catch (err) {
            throw err;
        }
    });
}
function getPurchaseRequestById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchaseRequestRepository = data_source_1.purwadhikaDB.getRepository(purchaserequest_entity_1.PurchaseRequest);
            const purchaseRequest = yield purchaseRequestRepository.findOne({
                where: { id },
                relations: ["item"]
            });
            return purchaseRequest;
        }
        catch (err) {
            throw err;
        }
    });
}
function editPurchaseRequestById(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchaseRequestRepository = data_source_1.purwadhikaDB.getRepository(purchaserequest_entity_1.PurchaseRequest);
            const purchaseRequest = yield purchaseRequestRepository.findOne({
                where: {
                    id
                }
            });
            if (!purchaseRequest) {
                return null;
            }
            yield data_source_1.purwadhikaDB.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                purchaseRequest.status = status;
                yield t.save(purchaseRequest);
            }));
            return purchaseRequest;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.default = { createPurchaseRequest, getAllPurchaseRequest, getPurchaseRequestById, editPurchaseRequestById };
