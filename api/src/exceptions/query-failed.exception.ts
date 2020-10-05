import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { MyLogger } from '../logger/logger.service';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = 500;

    const resp: any = {
      statusCode: statusCode,
      errorType: "Internal Server Error"
    };

    const logger = new MyLogger();
    logger.setContext('QueryFailedException');
    logger.error(JSON.stringify(exception.message), exception);

    if(process.env.NODE_ENV !== 'production') {
      resp.errorMessage = exception.message;
    }

    response
      .status(statusCode)
      .json(resp);
  }
}
