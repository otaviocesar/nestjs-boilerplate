import { GatewayPort } from '../../../domain/ports/secondary/gateway.port';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import GatewayEntity from './entities/gateway.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class Gateway implements GatewayPort {
  constructor(private httpService: HttpService) {}

  public async post(body: any, gateway: GatewayEntity): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(gateway.getPostUrl(), body, {
          headers: gateway.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      const { status, statusText, data } = error.response;
      Logger.log(status);
      Logger.log(data);
      throw new BadRequestException(statusText);
    }
  }

  public async get(gateway: GatewayEntity): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(gateway.getGetUrl(), {
          headers: gateway.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      const { status, statusText, data } = error.response;
      Logger.log(status);
      Logger.log(data);
      throw new BadRequestException(statusText);
    }
  }

  public async patch(body: any, gateway: GatewayEntity): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.patch(gateway.getPatchUrl(), body, {
          headers: gateway.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      const { status, statusText, data } = error.response;
      Logger.log(status);
      Logger.log(data);
      throw new BadRequestException(statusText);
    }
  }

  public async put(body: any, gateway: GatewayEntity): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.put(gateway.getPutUrl(), body, {
          headers: gateway.getHeaders(),
        }),
      );
      return response.data;
    } catch (error) {
      const { status, statusText, data } = error.response;
      Logger.log(status);
      Logger.log(data);
      throw new BadRequestException(statusText);
    }
  }
}
