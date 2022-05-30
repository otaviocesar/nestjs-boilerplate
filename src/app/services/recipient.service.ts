import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RecipientServicePort } from '../../domain/ports/primary/recipient-service.port';
import { AxiosResponse } from 'axios';
import PatchRecipientDto from '../../domain/entities/recipient/patch-recipient.dto';
import PatchAllRecipientDto from '../../domain/entities/recipient/patch-all-recipient.dto';
import { HttpClientPort } from '../../domain/ports/secondary/http-client.port';
import RecipientHeaderDto from '../../domain/entities/recipient/recipient-header.dto';
import PostRecipientDto from '../../domain/entities/recipient/post-recipient.dto';
import RecipientMapper from '../../infra/mappers/recipient.mapper';
import HttpClientConnectorFactory from '../../infra/factories/http-client.connector.factory';
import { v4 as uuidv4 } from 'uuid';
import HttpClientConnector from '../../infra/adapters/http-client/connectors/http-client.connector';
import GetRecipientDto from 'src/domain/entities/recipient/get-recipient.dto';

@Injectable()
export class RecipientService implements RecipientServicePort {
  constructor(
    @Inject('HttpClientPort')
    private httpClientPort: HttpClientPort,
  ) {}

  async patchAll(
    headers: RecipientHeaderDto,
    body: PatchAllRecipientDto,
  ): Promise<object> {
    if (!headers.mall) {
      throw new BadRequestException('mall is required in header');
    }

    const trackingId = uuidv4();
    const recipients = await this.get(
      await this.httpClientConnectorToGet(
        headers,
        `?cpfCnpj=${body.cpfCnpj}`,
        trackingId,
      ),
    );
    return this.fakeAccountsUpdate(
      await this.getRealAccount(recipients),
      await this.getFakeAccounts(recipients),
      headers,
      trackingId,
    );
  }

  async get(httpClientConnector: HttpClientConnector) {
    const response = await this.httpClientPort.get(httpClientConnector);
    return RecipientMapper.toFindDomains(response);
  }

  async httpClientConnectorToGet(
    headers: RecipientHeaderDto,
    queryParams: string,
    trackingId: string,
  ) {
    return HttpClientConnectorFactory.validRecipientToGet(
      headers,
      queryParams,
      trackingId,
    );
  }

  async patch(
    recipient: PatchRecipientDto,
    httpClientConnector: HttpClientConnector,
  ): Promise<any> {
    return this.httpClientPort.patch(recipient, httpClientConnector);
  }

  async httpClientConnectorToPatch(
    headers: RecipientHeaderDto,
    pathParam: string,
    trackingId: string,
  ) {
    return HttpClientConnectorFactory.validRecipientToPatch(
      headers,
      pathParam,
      trackingId,
    );
  }

  async getRealAccount(recipients: any): Promise<any> {
    if (recipients.length > 0) {
      for (const r of recipients) {
        if (r.contaBancaria && r.contaBancaria.codigoBanco != '000') {
          return r as GetRecipientDto;
        }
      }
      return false;
    } else {
      throw new NotFoundException('Not Found');
    }
  }

  async getFakeAccounts(recipients: any): Promise<any> {
    const fakeAccounts = [];
    if (recipients.length > 0) {
      for (const r of recipients) {
        if (r.contaBancaria?.codigoBanco === '000') {
          fakeAccounts.push(r);
        }
      }

      return fakeAccounts;
    } else {
      throw new NotFoundException('Not Found');
    }
  }

  async accountsUpdate(
    body: any,
    recipients: any,
    headers: RecipientHeaderDto,
    trackingId: string,
  ): Promise<any> {
    if (recipients.length > 0) {
      for (const r of recipients) {
        await this.patch(
          RecipientMapper.toPatchDomain(r, body),
          await this.httpClientConnectorToPatch(headers, r.id, trackingId),
        );
      }
      return true;
    } else {
      return false;
    }
  }

  async fakeAccountsUpdate(
    realAccount: any,
    fakeAccounts: any,
    headers: RecipientHeaderDto,
    trackingId: string,
  ): Promise<object> {
    if (realAccount && fakeAccounts.length > 0) {
      for (const fakeAccount of fakeAccounts) {
        await this.patch(
          RecipientMapper.toPatchFakeAccountDomain(fakeAccount, realAccount),
          await this.httpClientConnectorToPatch(
            headers,
            fakeAccount.id,
            trackingId,
          ),
        );
      }
      return {
        message: 'The records has been successfully updated!',
        httpClientTrackingId: trackingId,
      };
    } else {
      throw new NotFoundException('Not Found');
    }
  }

  async post(
    headers: RecipientHeaderDto,
    body: PostRecipientDto,
  ): Promise<object> {
    if (!headers.mall) {
      throw new BadRequestException('mall is required in header');
    }

    const trackingId = uuidv4();
    await this.postBankAccount(
      await this.httpClientConnectorBankAccountToPost(headers, trackingId),
      body,
    );

    const recipients = await this.get(
      await this.httpClientConnectorToGet(
        headers,
        `?cpfCnpj=${body.cpfCnpj}`,
        trackingId,
      ),
    );
    await this.accountsUpdate(body, recipients, headers, trackingId);
    return {
      message: 'The record has been successfully created!',
      httpClientTrackingId: trackingId,
    };
  }

  async postBankAccount(
    httpClientConnectorBankAccountToPost: HttpClientConnector,
    recipient: PostRecipientDto,
  ): Promise<AxiosResponse> {
    return this.httpClientPort.post(
      recipient,
      httpClientConnectorBankAccountToPost,
    );
  }

  async httpClientConnectorBankAccountToPost(
    headers: RecipientHeaderDto,
    trackingId: string,
  ) {
    return HttpClientConnectorFactory.validRecipientBankAccountToPost(
      headers,
      trackingId,
    );
  }
}
