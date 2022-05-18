import GetRecipientDto from 'src/domain/entities/recipient/get-recipient.dto';
import PatchRecipientDto from 'src/domain/entities/recipient/patch-recipient.dto';

export default class RecipientMapper {
  public static toFindDomains(recipientsEntity: any): GetRecipientDto[] {
    const recipients = [];
    recipientsEntity.forEach((recipientEntity) => {
      recipients.push(recipientEntity);
    });
    return recipients;
  }

  public static toPatchDomain(
    recipientsEntity: GetRecipientDto,
  ): PatchRecipientDto {
    return new PatchRecipientDto(recipientsEntity.contaBancaria);
  }
}
