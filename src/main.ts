import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RolesService } from './roles/roles.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // manera de acceder a un servicio
  const port = configService.get('PORT');

  const rolesService = app.get(RolesService); // manera de acceder a un servicio
  await rolesService.createRoles();

  app.useGlobalPipes( new ValidationPipe() );

  await app.listen(port);
}
bootstrap();
