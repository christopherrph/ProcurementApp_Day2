import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableItemProcOrderPurchaseReq1742289745189 implements MigrationInterface {
    name = 'CreateTableItemProcOrderPurchaseReq1742289745189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "stock" integer NOT NULL, "lastUpdated" TIMESTAMP NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "procurementorder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplier" character varying NOT NULL, "status" character varying NOT NULL, "orderDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_75d884a4af41f232678fe0d9176" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchaserequest" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "status" character varying NOT NULL, "requestDate" TIMESTAMP NOT NULL, "itemId" uuid, "procurementOrderId" uuid, CONSTRAINT "PK_86458fa55cf04ff04eb62c5b8bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchaserequest" ADD CONSTRAINT "FK_a73d572156bd3c37468b40ef954" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchaserequest" ADD CONSTRAINT "FK_a289eb0207976f2d2a5db695551" FOREIGN KEY ("procurementOrderId") REFERENCES "procurementorder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchaserequest" DROP CONSTRAINT "FK_a289eb0207976f2d2a5db695551"`);
        await queryRunner.query(`ALTER TABLE "purchaserequest" DROP CONSTRAINT "FK_a73d572156bd3c37468b40ef954"`);
        await queryRunner.query(`DROP TABLE "purchaserequest"`);
        await queryRunner.query(`DROP TABLE "procurementorder"`);
        await queryRunner.query(`DROP TABLE "item"`);
    }

}
