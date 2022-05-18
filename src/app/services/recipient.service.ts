import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { RecipientServicePort } from '../../domain/ports/primary/recipient-service.port';
import { AxiosResponse } from 'axios';
import PatchRecipientDto from '../../domain/entities/recipient/patch-recipient.dto';
import PatchAllRecipientDto from '../../domain/entities/recipient/patch-all-recipient.dto';
import { GatewayPort } from '../../domain/ports/secondary/gateway.port';
import RecipientHeaderDto from 'src/domain/entities/recipient/recipient-header.dto';
import PostRecipientDto from 'src/domain/entities/recipient/post-recipient.dto';
import RecipientMapper from 'src/infra/mappers/recipient.mapper';
import GatewayRecipientFactory from 'src/infra/factories/gateway.recipient.factory';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RecipientService implements RecipientServicePort {
  constructor(
    @Inject('GatewayPort')
    private gatewayPort: GatewayPort,
  ) {}

  async get(
    headers: RecipientHeaderDto,
    queryParams: string,
    trackingId: string,
  ) {
    const gatewayRecipientToGet = GatewayRecipientFactory.validRecipientToGet(
      headers,
      queryParams,
      trackingId,
    );
    const response = await this.gatewayPort.get(gatewayRecipientToGet);
    return RecipientMapper.toFindDomains(response);
  }

  async post(
    headers: RecipientHeaderDto,
    recipient: PostRecipientDto,
    trackingId: string,
  ): Promise<AxiosResponse> {
    const gatewayRecipientToPost = GatewayRecipientFactory.validRecipientToPost(
      headers,
      trackingId,
    );
    return this.gatewayPort.post(recipient, gatewayRecipientToPost);
  }

  async patch(
    headers: RecipientHeaderDto,
    recipient: PatchRecipientDto,
    pathParam: string,
    trackingId: string,
  ): Promise<any> {
    const gatewayRecipientToPatch =
      GatewayRecipientFactory.validRecipientToPatch(
        headers,
        pathParam,
        trackingId,
      );
    return this.gatewayPort.patch(recipient, gatewayRecipientToPatch);
  }

  async patchAll(
    headers: RecipientHeaderDto,
    recipient: PatchAllRecipientDto,
  ): Promise<any> {
    const trackingId = uuidv4();
    console.log('trackingId: ' + trackingId);
    const recipients = await this.get(
      headers,
      `?cpfCnpj=${recipient.cpfCnpj}`,
      trackingId,
    );
    const flag = await this.accountsVerification(recipients);
    return this.accountsUpdate(flag, recipients, headers, trackingId);
  }

  async accountsVerification(recipients: any): Promise<boolean> {
    let fakeAccount = false;
    let realAccount = false;
    if (recipients.length > 0) {
      for (const r of recipients) {
        if (r.contaBancaria.codigoBanco != '000') {
          realAccount = true;
        } else {
          fakeAccount = true;
        }
      }
      return fakeAccount && realAccount ? true : false;
    } else {
      throw new NotFoundException('Not Found');
    }
  }

  async accountsUpdate(
    flag: boolean,
    recipients: any,
    headers: RecipientHeaderDto,
    trackingId: string,
  ): Promise<string> {
    if (flag) {
      for (const r of recipients) {
        const patchBody = RecipientMapper.toPatchDomain(r);
        console.log('trackingId: ' + trackingId);
        await this.patch(headers, patchBody, r.id, trackingId);
      }
      return 'All accounts have been successfully patched!';
    } else {
      throw new NotFoundException('Not Found');
    }
  }
}
