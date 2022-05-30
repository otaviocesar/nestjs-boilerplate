import RecipientHeaderDto from '../../domain/entities/recipient/recipient-header.dto';
import HttpClientConnector from '../adapters/http-client/connectors/http-client.connector';
import {
  GATEWAY_URL,
  GATEWAY_CLIENT_ID,
  GATEWAY_ACCESS_TOKEN,
} from '../environments/index';

export default class HttpClientConnectorFactory {
  static validRecipientToGet(
    headers: RecipientHeaderDto,
    queryParams: string,
    trackingId: string,
  ): HttpClientConnector {
    const httpClient = new HttpClientConnector();
    httpClient.setDomain(HttpClientConnectorFactory.getDomain(headers));
    httpClient.setClientId(GATEWAY_CLIENT_ID);
    httpClient.setAccessToken(GATEWAY_ACCESS_TOKEN);
    httpClient.setApi('hub-pagamentos/v1');
    httpClient.setResource(`recebedores${queryParams}`);
    httpClient.setHeaderMall(headers.mall);
    httpClient.setTrackingId(trackingId);
    return httpClient;
  }

  static validRecipientToPatch(
    headers: RecipientHeaderDto,
    pathParam: string,
    trackingId: string,
  ): HttpClientConnector {
    const httpClient = new HttpClientConnector();
    httpClient.setDomain(HttpClientConnectorFactory.getDomain(headers));
    httpClient.setClientId(GATEWAY_CLIENT_ID);
    httpClient.setAccessToken(GATEWAY_ACCESS_TOKEN);
    httpClient.setApi('hub-pagamentos/v1');
    httpClient.setResource('recebedores');
    httpClient.setPathParam(pathParam);
    httpClient.setHeaderMall(headers.mall);
    httpClient.setTrackingId(trackingId);
    return httpClient;
  }

  static validRecipientBankAccountToPost(
    headers: RecipientHeaderDto,
    trackingId: string,
  ): HttpClientConnector {
    const httpClient = new HttpClientConnector();
    httpClient.setDomain(HttpClientConnectorFactory.getDomain(headers));
    httpClient.setClientId(GATEWAY_CLIENT_ID);
    httpClient.setAccessToken(GATEWAY_ACCESS_TOKEN);
    httpClient.setApi('hub-pagamentos/v1');
    httpClient.setResource('contasbancarias');
    httpClient.setHeaderMall(headers.mall);
    httpClient.setTrackingId(trackingId);
    return httpClient;
  }

  public static getDomain(headers: RecipientHeaderDto): string {
    return headers.is_sandbox ? 'https://domain.com.br/sb' : GATEWAY_URL;
  }
}
