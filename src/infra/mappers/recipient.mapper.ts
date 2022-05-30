import GetRecipientDto from '../../domain/entities/recipient/get-recipient.dto';
import PatchAllRecipientDto from '../../domain/entities/recipient/patch-all-recipient.dto';
import PatchRecipientDto from '../../domain/entities/recipient/patch-recipient.dto';

export default class RecipientMapper {
  public static toFindDomains(recipientsEntity: any): GetRecipientDto[] {
    const recipients = [];
    recipientsEntity.forEach((recipientEntity) => {
      recipients.push(recipientEntity);
    });
    return recipients;
  }

  public static toPatchFakeAccountDomain(
    recipientsEntity: GetRecipientDto,
    patchBody: GetRecipientDto,
  ): PatchRecipientDto {
    const recipients = new PatchRecipientDto(recipientsEntity.contaBancaria);
    recipients.setAgencia(patchBody.contaBancaria.agencia);
    recipients.setAgenciaDv(patchBody.contaBancaria.agenciaDv);
    recipients.setCodigoBanco(patchBody.contaBancaria.codigoBanco);
    recipients.setConta(patchBody.contaBancaria.conta);
    recipients.setContaDv(patchBody.contaBancaria.contaDv);
    recipients.setCpfCnpj(patchBody.contaBancaria.cpfCnpj);
    recipients.setTipoConta(patchBody.contaBancaria.tipoConta);
    recipients.setTipoDocumento(patchBody.contaBancaria.tipoDocumento);
    recipients.setNome(recipientsEntity.nome);
    return recipients;
  }

  public static toPatchDomain(
    recipientsEntity: GetRecipientDto,
    patchBody: PatchAllRecipientDto,
  ): PatchRecipientDto {
    const recipients = new PatchRecipientDto(recipientsEntity.contaBancaria);
    recipients.setAgencia(patchBody.agencia);
    recipients.setAgenciaDv(patchBody.agenciaDv);
    recipients.setCodigoBanco(patchBody.codigoBanco);
    recipients.setConta(patchBody.conta);
    recipients.setContaDv(patchBody.contaDv);
    recipients.setCpfCnpj(patchBody.cpfCnpj);
    recipients.setTipoConta(patchBody.tipoConta);
    recipients.setTipoDocumento(patchBody.tipoDocumento);
    recipients.setNome(recipientsEntity.nome);
    return recipients;
  }
}
