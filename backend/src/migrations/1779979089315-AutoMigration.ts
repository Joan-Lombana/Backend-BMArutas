import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1779979089315 implements MigrationInterface {
    name = 'AutoMigration1779979089315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "incidencia" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recorrido_id" uuid, "tipo" character varying NOT NULL, "descripcion" text NOT NULL, "foto" text, "timestamp" bigint, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1e98587e9dc53e62e039e0dbabf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recorrido" ADD "fecha_programada" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "posicion" ADD "imagen_base64" text`);
        await queryRunner.query(`ALTER TABLE "incidencia" ADD CONSTRAINT "FK_55424be9ae8b8a2f5b8a1403c34" FOREIGN KEY ("recorrido_id") REFERENCES "recorrido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "incidencia" DROP CONSTRAINT "FK_55424be9ae8b8a2f5b8a1403c34"`);
        await queryRunner.query(`ALTER TABLE "posicion" DROP COLUMN "imagen_base64"`);
        await queryRunner.query(`ALTER TABLE "recorrido" DROP COLUMN "fecha_programada"`);
        await queryRunner.query(`DROP TABLE "incidencia"`);
    }

}
