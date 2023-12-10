import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Video Support Project')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Video Support')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  const restfulPort = 4000;
  await app.listen(restfulPort);
  console.log(
    `Nest application is running on: http://localhost:${restfulPort}`,
  );
}
bootstrap();
