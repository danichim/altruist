import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch (exception: BadRequestException, host: ArgumentsHost) {
    const type = host.getType();
    console.log('type', type);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    const logger = new MyLogger();
    logger.setContext('BadRequestException');
    logger.error(JSON.stringify(exception.message), exception);
    const resp: any = {
      statusCode: status,
    };

    if (process.env.NODE_ENV !== 'production') {
      resp.errorMessage = exception.message;
    }

    response.status(status).json(resp);
  }
}
