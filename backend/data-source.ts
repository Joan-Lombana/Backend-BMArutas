// data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Usuario } from './src/autenticacion/usuario/entities/usuario.entity';
import { Rol } from './src/autenticacion/rol/entities/rol.entity';
import { Perfil } from './src/autenticacion/perfil/entities/perfil.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'ecoruta-postgis', // nombre del contenedor Docker
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'ecoruta',
  synchronize: process.env.NODE_ENV !== 'production', // ✅ solo true en dev
  logging: true,
  entities: [Usuario, Rol, Perfil],
  migrations: ['src/migrations/*.ts'],
  ssl: false,
});
