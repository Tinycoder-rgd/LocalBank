import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow React frontend
  app.enableCors({
    origin: 'http://localhost:5173', // Your React dev server
    methods: ['GET', 'POST'],
  });

  await app.listen(3001);
}
bootstrap();
