import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import BadRequestException from 'src/domain/errors/bad-request.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { message, status } = this.isBusinessException(exception);

    response.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  public isBusinessException(exception: Error): any {
    if (exception instanceof BadRequestException) {
      return {
        message: exception.message,
        status: 400,
      };
    }
    if (exception instanceof UnauthorizedException) {
      return {
        message: exception.message,
        status: 401,
      };
    }
    if (exception instanceof NotFoundException) {
      return {
        message: exception.message,
        status: 404,
      };
    }
    if (exception instanceof ConflictException) {
      return {
        message: exception.message,
        status: 409,
      };
    }
    Logger.log(exception.stack);
    return {
      message: 'Internal server error',
      status: 500,
    };
  }
}
