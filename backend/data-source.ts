// data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './src/autenticacion/usuario/entities/usuario.entity';
import { Rol } from './src/autenticacion/rol/entities/rol.entity';
import { Perfil } from './src/autenticacion/perfil/entities/perfil.entity';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  throw new Error('Faltan variables de entorno de la base de datos. Revisa tu archivo .env');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [Usuario, Rol, Perfil],
  migrations: ['src/migrations/*.ts'],
  ssl: process.env.DB_SSL === 'true', // opcional, se activa solo si lo configuras en .env
});
