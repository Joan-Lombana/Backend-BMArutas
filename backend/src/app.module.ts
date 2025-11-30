import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './autenticacion/auth.module';
import { OperativoModule } from './operativo/operativo.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // carga .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    OperativoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
