import { AxiosResponse } from 'axios';
import HttpClientConnector from '../../../infra/adapters/http-client/connectors/http-client.connector';
export interface HttpClientPort {
  patch(body: any, httpClient: HttpClientConnector): Promise<AxiosResponse>;
  get(httpClient: HttpClientConnector): Promise<AxiosResponse>;
  post(body: any, httpClient: HttpClientConnector): Promise<AxiosResponse>;
}
