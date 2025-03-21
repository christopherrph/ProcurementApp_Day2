import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterRelation1742365200443 implements MigrationInterface {
    name = 'AlterRelation1742365200443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchaserequest" DROP CONSTRAINT "FK_a289eb0207976f2d2a5db695551"`);
        await queryRunner.query(`ALTER TABLE "purchaserequest" DROP COLUMN "procurementOrderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchaserequest" ADD "procurementOrderId" uuid`);
        await queryRunner.query(`ALTER TABLE "purchaserequest" ADD CONSTRAINT "FK_a289eb0207976f2d2a5db695551" FOREIGN KEY ("procurementOrderId") REFERENCES "procurementorder"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
