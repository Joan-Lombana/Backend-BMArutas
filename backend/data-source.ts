// data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// 🔥 Cargar .env SIEMPRE (clave para migraciones)
dotenv.config({
  path: path.resolve(process.cwd(), '../.env'),
});

// 🔒 Validación segura
const requiredEnv = [
  'DB_HOST',
  'DB_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
];

const missingEnv = requiredEnv.filter((env) => !process.env[env]);

if (missingEnv.length > 0) {
  throw new Error(
    `❌ Faltan variables de entorno: ${missingEnv.join(', ')}`
  );
}

// 🚀 DataSource
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,

  // ⚠️ IMPORTANTE: usar migraciones, no synchronize
  synchronize: false,

  logging: true,

  // 👇 compatible con ts-node y build
  entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],

  // 👇 ruta correcta para migraciones
  migrations: [path.join(__dirname, '/src/migrations/*{.ts,.js}')],

  ssl: process.env.DB_SSL === 'true',
});

