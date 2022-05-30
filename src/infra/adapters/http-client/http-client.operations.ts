import { HttpClientPort } from '../../../domain/ports/secondary/http-client.port';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import HttpClientConnector from './connectors/http-client.connector';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpClient implements HttpClientPort {
  constructor(private httpService: HttpService) {}

  public async post(
    body: any,
    httpClientConnector: HttpClientConnector,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(httpClientConnector.getBasicUrl(), body, {
          headers: httpClientConnector.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      Logger.log(error);
      await this.throwError(error);
    }
  }

  public async get(httpClientConnector: HttpClientConnector): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(httpClientConnector.getBasicUrl(), {
          headers: httpClientConnector.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      Logger.log(error);
      await this.throwError(error);
    }
  }

  public async patch(
    body: any,
    httpClientConnector: HttpClientConnector,
  ): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(httpClientConnector.getPatchUrl(), body, {
          headers: httpClientConnector.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      Logger.log(error);
      await this.throwError(error);
    }
  }

  public async throwError(outputError: Error): Promise<any> {
    try {
      throw new BadRequestException(outputError.message);
    } catch (error) {
      Logger.log(error);
      throw new InternalServerErrorException(
        'HttpClient communication failure',
      );
    }
  }
}
