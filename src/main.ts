import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { PORT } from './infra/environments';
import { HttpExceptionFilter } from './infra/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate')
    .setDescription(
      'This project is a chassis, an starter code that represents the base microservice project to develop and deploy a NestJS framework project.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        description: 'Please enter token JWT.',
        name: 'Authorization',
        type: 'http',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
}
bootstrap();
