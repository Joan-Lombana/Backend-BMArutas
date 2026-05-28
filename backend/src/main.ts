import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  // Credenciales removidas por seguridad


  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Desactivamos el de por defecto para que no haya conflicto
  });

  // Configuramos el parser manualmente con el límite de 5MB
  const { json, urlencoded } = require('express');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.setGlobalPrefix('api');

  // CORS
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
