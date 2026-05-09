import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1778301300146 implements MigrationInterface {
    name = 'AutoMigration1778301300146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recorrido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ruta_id" character varying NOT NULL, "vehiculo_id" character varying NOT NULL, "conductor_id" character varying NOT NULL, "estado" "public"."recorrido_estado_enum" NOT NULL DEFAULT 'No programada', "api_recorrido_id" character varying, "fecha_inicio" TIMESTAMP, "fecha_fin" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3806792438b901429540a8e7a22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posicion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recorridoId" uuid NOT NULL, "latitud" numeric(10,7) NOT NULL, "longitud" numeric(10,7) NOT NULL, "timestamp" bigint NOT NULL, "velocidad" double precision, "sincronizadoOffline" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb52bc48295015542a988a82a5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posicion" ADD CONSTRAINT "FK_7568c0ba8f4c711157f3f9a7afa" FOREIGN KEY ("recorridoId") REFERENCES "recorrido"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posicion" DROP CONSTRAINT "FK_7568c0ba8f4c711157f3f9a7afa"`);
        await queryRunner.query(`DROP TABLE "posicion"`);
        await queryRunner.query(`DROP TABLE "recorrido"`);
    }

}
