import { AxiosResponse } from 'axios';
import GatewayEntity from 'src/infra/adapters/gateway/entities/gateway.entity';
export interface GatewayPort {
  patch(body: any, gateway: GatewayEntity): Promise<AxiosResponse>;
  get(gateway: GatewayEntity): Promise<AxiosResponse>;
  post(body: any, gateway: GatewayEntity): Promise<AxiosResponse>;
}
