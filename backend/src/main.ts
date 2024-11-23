import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();