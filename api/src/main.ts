import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerJson } from './swagger';
import { ConfigService } from "@nestjs/config";
import { Transport } from "@nestjs/microservices";
import { MyLogger } from './logger/logger.service';
import { BadRequestExceptionFilter } from './exceptions/bad-request.exception';
import { QueryFailedExceptionFilter } from './exceptions/query-failed.exception';
import { HttpExceptionFilter } from './exceptions/http.exception';

require('dotenv').config();
const PORT = process.env.PORT;

const initApp = async () => {

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'warn']
  });
  app.enableCors();

  app.useGlobalFilters(new BadRequestExceptionFilter(), new QueryFailedExceptionFilter(), new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    validationError: { target: false },
  }));


  const swaggerSpec = swaggerJSDoc(swaggerJson);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.startAllMicroservicesAsync();

  app.listen(PORT, async () => {
    const logger = await app.resolve(MyLogger);
    logger.setContext('Main');
    logger.log(`Server started listening on PORT: ${PORT}`);
  });
};

function bootstrap() {
  initApp();
}

bootstrap();
