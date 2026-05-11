"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoMigration1778305531000 = void 0;

class AutoMigration1778305531000 {
    name = 'AutoMigration1778305531000';

    async up(queryRunner) {

        // =========================
        // 1. ENUMS (OBLIGATORIO PRIMERO)
        // =========================

        await queryRunner.query(`
            CREATE TYPE "roles_tipo_enum" AS ENUM ('admin', 'usuario', 'conductor')
        `);

        await queryRunner.query(`
            CREATE TYPE "recorrido_estado_enum" AS ENUM (
                'No programada',
                'Programada',
                'Activa',
                'Pausado',
                'Cancelado',
                'Finalizado'
            )
        `);

        // =========================
        // 2. TABLA ROLES
        // =========================

        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "tipo" "roles_tipo_enum" NOT NULL DEFAULT 'usuario',
                "descripcion" character varying,
                CONSTRAINT "PK_roles" PRIMARY KEY ("id")
            )
        `);

        // =========================
        // 3. TABLA USUARIOS
        // =========================

        await queryRunner.query(`
            CREATE TABLE "usuarios" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "primerNombre" character varying NOT NULL,
                "segundoNombre" character varying,
                "primerApellido" character varying NOT NULL,
                "segundoApellido" character varying NOT NULL,
                "correo" character varying NOT NULL,
                "password" character varying NOT NULL,
                "numero_celular" character varying(15),
                "activo" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_correo" UNIQUE ("correo"),
                CONSTRAINT "PK_usuarios" PRIMARY KEY ("id")
            )
        `);

        // =========================
        // 4. TABLA PERFILES
        // =========================

        await queryRunner.query(`
            CREATE TABLE "perfiles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "estado" character varying(20) NOT NULL DEFAULT 'activo',
                "personalizacion" jsonb,
                "usuario_id" uuid NOT NULL,
                "rol_id" uuid,
                CONSTRAINT "REL_usuario" UNIQUE ("usuario_id"),
                CONSTRAINT "PK_perfiles" PRIMARY KEY ("id")
            )
        `);

        // =========================
        // 5. TABLA RECORRIDO
        // =========================

        await queryRunner.query(`
            CREATE TABLE "recorrido" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "ruta_id" character varying NOT NULL,
                "vehiculo_id" character varying NOT NULL,
                "conductor_id" character varying NOT NULL,
                "estado" "recorrido_estado_enum" NOT NULL DEFAULT 'No programada',
                "api_recorrido_id" character varying,
                "fecha_inicio" TIMESTAMP,
                "fecha_fin" TIMESTAMP,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_recorrido" PRIMARY KEY ("id")
            )
        `);

        // =========================
        // 6. TABLA POSICION
        // =========================

        await queryRunner.query(`
            CREATE TABLE "posicion" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "recorridoId" uuid NOT NULL,
                "latitud" numeric(10,7) NOT NULL,
                "longitud" numeric(10,7) NOT NULL,
                "timestamp" bigint NOT NULL,
                "velocidad" double precision,
                "sincronizadoOffline" boolean NOT NULL DEFAULT false,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_posicion" PRIMARY KEY ("id")
            )
        `);

        // =========================
        // 7. FOREIGN KEYS (AL FINAL)
        // =========================

        await queryRunner.query(`
            ALTER TABLE "perfiles"
            ADD CONSTRAINT "FK_perfiles_usuario"
            FOREIGN KEY ("usuario_id")
            REFERENCES "usuarios"("id")
            ON DELETE CASCADE
        `);

        await queryRunner.query(`
            ALTER TABLE "perfiles"
            ADD CONSTRAINT "FK_perfiles_rol"
            FOREIGN KEY ("rol_id")
            REFERENCES "roles"("id")
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "posicion"
            ADD CONSTRAINT "FK_posicion_recorrido"
            FOREIGN KEY ("recorridoId")
            REFERENCES "recorrido"("id")
            ON DELETE CASCADE
        `);
    }

    async down(queryRunner) {

        await queryRunner.query(`ALTER TABLE "posicion" DROP CONSTRAINT "FK_posicion_recorrido"`);
        await queryRunner.query(`ALTER TABLE "perfiles" DROP CONSTRAINT "FK_perfiles_rol"`);
        await queryRunner.query(`ALTER TABLE "perfiles" DROP CONSTRAINT "FK_perfiles_usuario"`);

        await queryRunner.query(`DROP TABLE "posicion"`);
        await queryRunner.query(`DROP TABLE "recorrido"`);
        await queryRunner.query(`DROP TABLE "perfiles"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TABLE "roles"`);

        await queryRunner.query(`DROP TYPE "recorrido_estado_enum"`);
        await queryRunner.query(`DROP TYPE "roles_tipo_enum"`);
    }
}

exports.AutoMigration1778305531000 = AutoMigration1778305531000;
