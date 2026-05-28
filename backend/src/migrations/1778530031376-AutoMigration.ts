import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1778530031376 implements MigrationInterface {
    name = 'AutoMigration1778530031376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "primerNombre" character varying NOT NULL, "segundoNombre" character varying, "primerApellido" character varying NOT NULL, "segundoApellido" character varying NOT NULL, "correo" character varying NOT NULL, "password" character varying NOT NULL, "numero_celular" character varying(15), "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_63665765c1a778a770c9bd585d3" UNIQUE ("correo"), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "perfiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "estado" character varying(20) NOT NULL DEFAULT 'activo', "personalizacion" jsonb, "usuario_id" uuid NOT NULL, "rol_id" uuid, CONSTRAINT "REL_f1ba88813b103ae277538c3fdd" UNIQUE ("usuario_id"), CONSTRAINT "PK_50d8a0a9bdea75489c5f230ce27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."roles_tipo_enum" AS ENUM('admin', 'usuario', 'conductor')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tipo" "public"."roles_tipo_enum" NOT NULL DEFAULT 'usuario', "descripcion" character varying, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posicion" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recorridoId" uuid NOT NULL, "latitud" numeric(10,7) NOT NULL, "longitud" numeric(10,7) NOT NULL, "timestamp" bigint NOT NULL, "velocidad" double precision, "sincronizadoOffline" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb52bc48295015542a988a82a5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."recorrido_estado_enum" AS ENUM('No programada', 'Programada', 'Activa', 'Pausado', 'Finalizado', 'Cancelado')`);
        await queryRunner.query(`CREATE TABLE "recorrido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ruta_id" character varying NOT NULL, "vehiculo_id" character varying NOT NULL, "conductor_id" character varying NOT NULL, "estado" "public"."recorrido_estado_enum" NOT NULL DEFAULT 'No programada', "api_recorrido_id" character varying, "fecha_inicio" TIMESTAMP, "fecha_fin" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3806792438b901429540a8e7a22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "perfiles" ADD CONSTRAINT "FK_f1ba88813b103ae277538c3fdd8" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "perfiles" ADD CONSTRAINT "FK_d726d0664a48b26e5645aa2d14b" FOREIGN KEY ("rol_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posicion" ADD CONSTRAINT "FK_7568c0ba8f4c711157f3f9a7afa" FOREIGN KEY ("recorridoId") REFERENCES "recorrido"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posicion" DROP CONSTRAINT "FK_7568c0ba8f4c711157f3f9a7afa"`);
        await queryRunner.query(`ALTER TABLE "perfiles" DROP CONSTRAINT "FK_d726d0664a48b26e5645aa2d14b"`);
        await queryRunner.query(`ALTER TABLE "perfiles" DROP CONSTRAINT "FK_f1ba88813b103ae277538c3fdd8"`);
        await queryRunner.query(`DROP TABLE "recorrido"`);
        await queryRunner.query(`DROP TYPE "public"."recorrido_estado_enum"`);
        await queryRunner.query(`DROP TABLE "posicion"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "public"."roles_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "perfiles"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
