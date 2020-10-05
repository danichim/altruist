import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { MyLogger } from '../logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const type = host.getType();

        const logger = new MyLogger();
        logger.setContext('HttpException');

        // It comes from microservice (Redis)
        if (type === 'rpc') {
            logger.error(JSON.stringify(exception.message), exception);
            return exception.message;
        }

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        logger.error(JSON.stringify(exception.message), exception);
        const resp: any = {
            statusCode: status,
        };

        if(process.env.NODE_ENV !== 'production') {
            resp.errorMessage = exception.message;
        }

        response
            .status(status)
            .json(resp);
    }
}
