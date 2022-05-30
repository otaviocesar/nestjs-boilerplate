import { Test, TestingModule } from '@nestjs/testing';
import { RecipientBankAccountController } from '../../../src/interfaces/http/recipient-bank-account.controller';
import { RecipientService } from '../../../src/app/services/recipient.service';
import { HttpClient } from '../../../src/infra/adapters/http-client/http-client.operations';
import RecipientFactory from '../../../src/infra/factories/recipient.factory';
import { HttpModule } from '@nestjs/axios';
import RecipientHeaderDto from '../../../src/domain/entities/recipient/recipient-header.dto';

const mockAccount = RecipientFactory.validAccountToPost();

describe('RecipientBankAccountController', () => {
  let recipientBankAccountController: RecipientBankAccountController;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [RecipientBankAccountController],
      providers: [
        {
          provide: 'RecipientServicePort',
          useClass: RecipientService,
        },
        {
          provide: 'HttpClientPort',
          useClass: HttpClient,
        },
      ],
    }).compile();

    recipientBankAccountController = module.get<RecipientBankAccountController>(
      RecipientBankAccountController,
    );
  });

  it('it should be defined', () => {
    expect(recipientBankAccountController).toBeDefined();
  });

  it('it should create bank account for recipients with cpfCnpj informed', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    headers.setIsSandbox(true);
    const response = await recipientBankAccountController.post(
      mockAccount,
      headers,
    );

    expect(response).toEqual({
      httpClientTrackingId: expect.any(String),
      message: expect.any(String),
    });
  });
});
