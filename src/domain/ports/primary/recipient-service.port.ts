import PatchRecipientDto from '../../entities/recipient/patch-recipient.dto';
import PatchAllRecipientDto from '../../entities/recipient/patch-all-recipient.dto';
import PostRecipientDto from '../../entities/recipient/post-recipient.dto';
import RecipientHeaderDto from 'src/domain/entities/recipient/recipient-header.dto';

export interface RecipientServicePort {
  patchAll(
    headers: RecipientHeaderDto,
    recipient: PatchAllRecipientDto,
  ): Promise<any>;

  patch(
    headers: RecipientHeaderDto,
    recipient: PatchRecipientDto,
    pathParam: string,
    trackingId: string,
  ): Promise<any>;

  get(
    headers: RecipientHeaderDto,
    queryParams: string,
    trackingId: string,
  ): Promise<any>;

  post(
    headers: RecipientHeaderDto,
    recipient: PostRecipientDto,
    trackingId: string,
  ): Promise<any>;
}
