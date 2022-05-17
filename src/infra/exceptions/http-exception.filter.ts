import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionString = JSON.stringify(exception);

    const { message, status } = this.isBusinessException(
      exception,
      exceptionString,
    );

    response.status(status).json({
      message: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  public isBusinessException(exception: Error, exceptionString: string): any {
    Logger.log(exception.stack);
    Logger.log(exceptionString);
    const exceptionJson = JSON.parse(exceptionString);
    return {
      message: exceptionJson.response.message,
      status: exceptionJson.response.statusCode,
    };
  }
}
