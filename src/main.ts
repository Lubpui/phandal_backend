import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useWebSocketAdapter()

  app.useStaticAssets(path.join(__dirname, '../uploads'));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
