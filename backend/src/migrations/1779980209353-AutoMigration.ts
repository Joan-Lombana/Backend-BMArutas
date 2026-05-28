import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1779980209353 implements MigrationInterface {
    name = 'AutoMigration1779980209353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recorrido" DROP COLUMN "fecha_inicio"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recorrido" ADD "fecha_inicio" TIMESTAMP`);
    }

}
