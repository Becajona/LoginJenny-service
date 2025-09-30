import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración global de pipes para validación DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,             // elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true,  // lanza error si envían propiedades extra
      forbidUnknownValues: false,  // evita errores con objetos vacíos o valores no esperados
      transform: true,             // transforma payloads a instancias de DTO
    }),
  );

  // Levanta el servidor en el puerto 3000 escuchando todas las interfaces
  await app.listen(3000, '0.0.0.0');
}
bootstrap();