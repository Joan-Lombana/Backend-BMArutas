import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './autenticacion/auth.module';
import { OperativoModule } from './operativo/operativo.module';
import { ApilucioModule } from 'rutas-service/src/apilucio/apilucio.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ carga .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    OperativoModule,
    ApilucioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
