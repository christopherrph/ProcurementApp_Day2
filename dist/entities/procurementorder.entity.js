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
exports.ProcurementOrder = void 0;
const typeorm_1 = require("typeorm");
const purchaserequest_entity_1 = require("./purchaserequest.entity");
let ProcurementOrder = class ProcurementOrder {
};
exports.ProcurementOrder = ProcurementOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ProcurementOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], ProcurementOrder.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", String)
], ProcurementOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ProcurementOrder.prototype, "orderDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => purchaserequest_entity_1.PurchaseRequest, purchaseRequest => purchaseRequest.item),
    __metadata("design:type", purchaserequest_entity_1.PurchaseRequest)
], ProcurementOrder.prototype, "purchaseRequests", void 0);
exports.ProcurementOrder = ProcurementOrder = __decorate([
    (0, typeorm_1.Entity)({ name: "procurementorder" })
], ProcurementOrder);
