import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1779994812457 implements MigrationInterface {
    name = 'AutoMigration1779994812457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidencia" ADD "api_incidencia_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidencia" DROP COLUMN "api_incidencia_id"`);
    }

}
