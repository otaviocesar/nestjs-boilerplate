import RecipientHeaderDto from 'src/domain/entities/recipient/recipient-header.dto';
import GatewayEntity from '../adapters/gateway/entities/gateway.entity';

export default class GatewayRecipientFactory {
  static validRecipientToGet(
    headers: RecipientHeaderDto,
    queryParams: string,
    trackingId: string,
  ): GatewayEntity {
    const gateway = new GatewayEntity();
    gateway.setApi('hub-pagamentos/v1');
    gateway.setResource(`recebedores${queryParams}`);
    gateway.setHeaderEmpreendimento(headers.empreendimento);
    gateway.setTrackingId(trackingId);
    return gateway;
  }

  static validRecipientToPatch(
    headers: RecipientHeaderDto,
    pathParam: string,
    trackingId: string,
  ): GatewayEntity {
    const gateway = new GatewayEntity();
    gateway.setApi('hub-pagamentos/v1');
    gateway.setResource('recebedores');
    gateway.setPathParam(pathParam);
    gateway.setHeaderEmpreendimento(headers.empreendimento);
    gateway.setTrackingId(trackingId);
    return gateway;
  }

  static validRecipientToPost(
    headers: RecipientHeaderDto,
    trackingId: string,
  ): GatewayEntity {
    const gateway = new GatewayEntity();
    gateway.setApi('hub-pagamentos/v1');
    gateway.setResource('recebedores');
    gateway.setHeaderEmpreendimento(headers.empreendimento);
    gateway.setTrackingId(trackingId);
    return gateway;
  }
}
