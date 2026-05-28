import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1778548312236 implements MigrationInterface {
    name = 'AutoMigration1778548312236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."eventos_recorrido_tipo_enum" AS ENUM('PROGRAMADO', 'INICIADO', 'PAUSADO', 'FINALIZADO', 'ELIMINADO', 'POSICION_RECIBIDA', 'ERROR_SINCRONIZACION')`);
        await queryRunner.query(`CREATE TABLE "eventos_recorrido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" "public"."eventos_recorrido_tipo_enum" NOT NULL, "payload" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "recorrido_id" uuid NOT NULL, CONSTRAINT "PK_ed2e1e33e7239b420eafa079019" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "eventos_recorrido" ADD CONSTRAINT "FK_de23437a19f791d718748f34f02" FOREIGN KEY ("recorrido_id") REFERENCES "recorrido"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "eventos_recorrido" DROP CONSTRAINT "FK_de23437a19f791d718748f34f02"`);
        await queryRunner.query(`DROP TABLE "eventos_recorrido"`);
        await queryRunner.query(`DROP TYPE "public"."eventos_recorrido_tipo_enum"`);
    }

}
