import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAddAvatar1742528287639 implements MigrationInterface {
    name = 'UserAddAvatar1742528287639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
