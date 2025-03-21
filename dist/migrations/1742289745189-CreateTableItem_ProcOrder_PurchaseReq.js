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
exports.CreateTableItemProcOrderPurchaseReq1742289745189 = void 0;
class CreateTableItemProcOrderPurchaseReq1742289745189 {
    constructor() {
        this.name = 'CreateTableItemProcOrderPurchaseReq1742289745189';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "stock" integer NOT NULL, "lastUpdated" TIMESTAMP NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "procurementorder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplier" character varying NOT NULL, "status" character varying NOT NULL, "orderDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_75d884a4af41f232678fe0d9176" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "purchaserequest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "status" character varying NOT NULL, "requestDate" TIMESTAMP NOT NULL, "itemId" uuid, "procurementOrderId" uuid, CONSTRAINT "PK_86458fa55cf04ff04eb62c5b8bf" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "purchaserequest" ADD CONSTRAINT "FK_a73d572156bd3c37468b40ef954" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "purchaserequest" ADD CONSTRAINT "FK_a289eb0207976f2d2a5db695551" FOREIGN KEY ("procurementOrderId") REFERENCES "procurementorder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "purchaserequest" DROP CONSTRAINT "FK_a289eb0207976f2d2a5db695551"`);
            yield queryRunner.query(`ALTER TABLE "purchaserequest" DROP CONSTRAINT "FK_a73d572156bd3c37468b40ef954"`);
            yield queryRunner.query(`DROP TABLE "purchaserequest"`);
            yield queryRunner.query(`DROP TABLE "procurementorder"`);
            yield queryRunner.query(`DROP TABLE "item"`);
        });
    }
}
exports.CreateTableItemProcOrderPurchaseReq1742289745189 = CreateTableItemProcOrderPurchaseReq1742289745189;
