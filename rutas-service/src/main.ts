import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();
  await app.listen(3001, '0.0.0.0');
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${3001}`);
}
bootstrap();

