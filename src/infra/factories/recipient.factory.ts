import PatchAllRecipientDto from '../../domain/entities/recipient/patch-all-recipient.dto';
import PostRecipientDto from '../../domain/entities/recipient/post-recipient.dto';

export default class RecipientFactory {
  static validAccountToPost(): PostRecipientDto {
    const recipient = new PostRecipientDto();
    recipient.setAgencia('0670');
    recipient.setAgenciaDv('1');
    recipient.setCodigoBanco('341');
    recipient.setConta('99584');
    recipient.setContaDv('4');
    recipient.setCpfCnpj('27932734000165');
    recipient.setTipoConta('conta_corrente');
    recipient.setTipoDocumento('cnpj');
    recipient.setNome('Loja');
    return recipient;
  }

  static validAccountToPatch(): PatchAllRecipientDto {
    const recipient = new PatchAllRecipientDto();
    recipient.setCpfCnpj('27932734000165');
    return recipient;
  }

  static invalidAccountToPost(): PostRecipientDto {
    const recipient = new PostRecipientDto();
    recipient.setAgencia('0670');
    recipient.setAgenciaDv('1');
    recipient.setCodigoBanco('');
    recipient.setConta('99584');
    recipient.setContaDv('4');
    recipient.setCpfCnpj('27932734000165');
    recipient.setTipoConta('conta_corrente');
    recipient.setTipoDocumento('cnpj');
    recipient.setNome('Loja');
    return recipient;
  }

  static invalidAccountToPatch(): PatchAllRecipientDto {
    const recipient = new PatchAllRecipientDto();
    recipient.setCpfCnpj(null);
    return recipient;
  }
}
