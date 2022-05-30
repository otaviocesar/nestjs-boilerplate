import { Test, TestingModule } from '@nestjs/testing';
import { RecipientController } from '../../../src/interfaces/http/recipient.controller';
import { RecipientService } from '../../../src/app/services/recipient.service';
import { HttpClient } from '../../../src/infra/adapters/http-client/http-client.operations';
import RecipientFactory from '../../../src/infra/factories/recipient.factory';
import { HttpModule } from '@nestjs/axios';
import RecipientHeaderDto from '../../../src/domain/entities/recipient/recipient-header.dto';

const mockAccount = RecipientFactory.validAccountToPatch();

describe('RecipientController', () => {
  let recipientController: RecipientController;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [RecipientController],
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

    recipientController = module.get<RecipientController>(RecipientController);
  });

  it('it should be defined', () => {
    expect(recipientController).toBeDefined();
  });

  it('it should update bank account of all recipients with cpfCnpj informed', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    headers.setIsSandbox(true);
    const response = await recipientController.patch(mockAccount, headers);

    expect(response).toEqual({
      httpClientTrackingId: expect.any(String),
      message: expect.any(String),
    });
  });
});
