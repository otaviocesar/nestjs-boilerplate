import PatchRecipientDto from '../../entities/recipient/patch-recipient.dto';
import PatchAllRecipientDto from '../../entities/recipient/patch-all-recipient.dto';
import RecipientHeaderDto from '../../../domain/entities/recipient/recipient-header.dto';
import PostRecipientDto from '../../../domain/entities/recipient/post-recipient.dto';
import HttpClientConnector from '../../../infra/adapters/http-client/connectors/http-client.connector';

export interface RecipientServicePort {
  patchAll(
    headers: RecipientHeaderDto,
    recipient: PatchAllRecipientDto,
  ): Promise<any>;

  patch(
    recipient: PatchRecipientDto,
    httpClientConnector: HttpClientConnector,
  ): Promise<any>;

  get(httpClientConnector: HttpClientConnector): Promise<any>;

  post(headers: RecipientHeaderDto, recipient: PostRecipientDto): Promise<any>;
}
