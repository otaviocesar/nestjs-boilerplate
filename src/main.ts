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
    .setDescription('The API description')
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
  const validationPipeOptions: ValidationPipeOptions = {
    forbidUnknownValues: true,
  };
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
}
bootstrap();
