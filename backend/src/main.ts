import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_PORT:', process.env.DB_PORT);
  console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
  console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
  console.log('POSTGRES_DB:', process.env.POSTGRES_DB);

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // ✅ CORS abierto para app web + app móvil
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

  console.log(
    `🚀 Servidor corriendo en http://0.0.0.0:${process.env.PORT ?? 3000}`,
  );
}

bootstrap();
