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
exports.AlterRelation1742365200443 = void 0;
class AlterRelation1742365200443 {
    constructor() {
        this.name = 'AlterRelation1742365200443';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "purchaserequest" DROP CONSTRAINT "FK_a289eb0207976f2d2a5db695551"`);
            yield queryRunner.query(`ALTER TABLE "purchaserequest" DROP COLUMN "procurementOrderId"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "purchaserequest" ADD "procurementOrderId" uuid`);
            yield queryRunner.query(`ALTER TABLE "purchaserequest" ADD CONSTRAINT "FK_a289eb0207976f2d2a5db695551" FOREIGN KEY ("procurementOrderId") REFERENCES "procurementorder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.AlterRelation1742365200443 = AlterRelation1742365200443;
