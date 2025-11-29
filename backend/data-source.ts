// data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './src/autenticacion/usuario/entities/usuario.entity';
import { Rol } from './src/autenticacion/rol/entities/rol.entity';
import { Perfil } from './src/autenticacion/perfil/entities/perfil.entity';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}


if (!process.env.DB_HOST || !process.env.DB_PORT || !process.env.POSTGRES_USER || !process.env.POSTGRES_PASSWORD || !process.env.POSTGRES_DB) {
  throw new Error('Faltan variables de entorno de la base de datos. Revisa tu archivo .env');
}


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.NODE_ENV !== 'production',
  logging: true,
  entities: [Usuario, Rol, Perfil],
  migrations: ['src/migrations/*.ts'],
  ssl: process.env.DB_SSL === 'true',
});

