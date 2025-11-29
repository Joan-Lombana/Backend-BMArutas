import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './autenticacion/auth.module';
import { OperativoModule } from './operativo/operativo.module';

// ✅ Logs de depuración antes de inicializar el módulo
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // carga .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD), // 👈 fuerza a string
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    OperativoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
