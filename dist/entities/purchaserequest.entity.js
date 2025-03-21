"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRequest = void 0;
const typeorm_1 = require("typeorm");
const item_entity_1 = require("./item.entity");
const procurementorder_entity_1 = require("./procurementorder.entity");
let PurchaseRequest = class PurchaseRequest {
};
exports.PurchaseRequest = PurchaseRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], PurchaseRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", Number)
], PurchaseRequest.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], PurchaseRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", Date)
], PurchaseRequest.prototype, "requestDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => item_entity_1.Item, item => item.id),
    __metadata("design:type", item_entity_1.Item)
], PurchaseRequest.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => procurementorder_entity_1.ProcurementOrder, procurementOrder => procurementOrder.id),
    __metadata("design:type", procurementorder_entity_1.ProcurementOrder)
], PurchaseRequest.prototype, "procurementOrder", void 0);
exports.PurchaseRequest = PurchaseRequest = __decorate([
    (0, typeorm_1.Entity)({ name: "purchaserequest" })
], PurchaseRequest);
