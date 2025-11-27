import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Ruta absoluta al .env que está en el nivel superior
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${process.env.PORT ?? 3000}`);
}
bootstrap();
