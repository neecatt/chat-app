import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Base Routing
  app.setGlobalPrefix('/v1/api');

  const PORT = process.env.PORT || 9000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT);

  const logger = new Logger();
  logger.log(`Application running on port ${PORT}`);
}
bootstrap();
