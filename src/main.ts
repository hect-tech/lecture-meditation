import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Bahai Devotional API')
    .setDescription('API pour lectures quotidiennes baha\'ies')
    .setVersion('1.0')
    .addTag('devotion')
    .addTag('daily-reflections')
    .addTag('texts')
    .addTag('books')
    .addTag('authors')
    .addTag('languages')
    .addTag('audio')
    .addTag('calendar')
    .addTag('search')
    .addTag('admin')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
