import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Base Routing
  app.setGlobalPrefix('/v1/api');

  const logger = new Logger();
  const PORT = process.env.PORT || 9000;
  logger.log(`Application running on port ${PORT}`);

  await app.listen(9000);
}
bootstrap();
