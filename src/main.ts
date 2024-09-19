import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  // app.useWebSocketAdapter()
  app.enableCors();
  app.useStaticAssets(path.join(__dirname, '../uploads'));
  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
