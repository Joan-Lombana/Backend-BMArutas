import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // ✅ permite solicitudes desde el frontend o Postman
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0'); // ✅ escucha en todas las interfaces
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${process.env.PORT ?? 3001}`);
}
bootstrap();

