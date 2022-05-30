import { Test, TestingModule } from '@nestjs/testing';
import { RecipientService } from '../../../src/app/services/recipient.service';
import { HttpClient } from '../../../src/infra/adapters/http-client/http-client.operations';
import RecipientFactory from '../../../src/infra/factories/recipient.factory';
import { HttpModule } from '@nestjs/axios';
import RecipientHeaderDto from '../../../src/domain/entities/recipient/recipient-header.dto';

const mockAccountToPatch = RecipientFactory.validAccountToPatch();
const mockAccountToPost = RecipientFactory.validAccountToPost();
const mockInvalidAccoutToPatch = RecipientFactory.invalidAccountToPatch();

describe('RecipientService', () => {
  let recipientService: RecipientService;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [RecipientService],
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

    recipientService = module.get<RecipientService>(RecipientService);
  });

  it('it should be defined', () => {
    expect(recipientService).toBeDefined();
  });

  it('it should update bank account of all recipients with cpfCnpj informed', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    headers.setIsSandbox(true);
    const response = await recipientService.patchAll(
      headers,
      mockAccountToPatch,
    );

    expect(response).toEqual({
      httpClientTrackingId: expect.any(String),
      message: expect.any(String),
    });
  });

  it('it should create bank account for recipients with cpfCnpj informed', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    headers.setIsSandbox(true);
    const response = await recipientService.post(headers, mockAccountToPost);

    expect(response).toEqual({
      httpClientTrackingId: expect.any(String),
      message: expect.any(String),
    });
  });

  it('it should return error if invalid queryParams was provided', async () => {
    const headers = new RecipientHeaderDto();
    const queryParams = '';
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    const httpClientConnectorToGet =
      await recipientService.httpClientConnectorToGet(headers, queryParams, '');
    expect(recipientService.get(httpClientConnectorToGet)).rejects.toThrow(
      new Error('HttpClient communication failure'),
    );
  });

  it('it should return error if no httpClientConnectorToGet was provided on get recipients', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    headers.setIsSandbox(true);
    const httpClientConnectorToGet = null;
    expect(recipientService.get(httpClientConnectorToGet)).rejects.toThrow(
      new Error('HttpClient communication failure'),
    );
  });

  it('it should return error if no params was provided on patch recipients', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    headers.setIsSandbox(true);
    expect(recipientService.patch(null, null)).rejects.toThrow(
      new Error('HttpClient communication failure'),
    );
  });

  it('it should return error if no httpClientConnectorBankAccountToPost was provided on postBankAccount', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall('PARQUE_D_PEDRO_SHOPPING');
    headers.setIsSandbox(true);
    const httpClientConnectorBankAccountToPost = null;
    expect(
      recipientService.postBankAccount(
        httpClientConnectorBankAccountToPost,
        mockAccountToPost,
      ),
    ).rejects.toThrow(new Error('HttpClient communication failure'));
  });

  it('it should return error when post recipients if invalid mall was provided', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall(null);
    headers.setIsSandbox(true);
    expect(recipientService.post(headers, mockAccountToPost)).rejects.toThrow(
      new Error('mall is required in header'),
    );
  });

  it('it should return error when patchAll recipients if invalid mall was provided', async () => {
    const headers = new RecipientHeaderDto();
    headers.setMall(null);
    headers.setIsSandbox(true);
    expect(
      recipientService.patchAll(headers, mockInvalidAccoutToPatch),
    ).rejects.toThrow(new Error('mall is required in header'));
  });

  it('it should not update accounts when was empty recipients array on accountsUpdate method', async () => {
    const headers = new RecipientHeaderDto();
    headers.setIsSandbox(true);
    expect(
      recipientService.accountsUpdate(
        mockInvalidAccoutToPatch,
        [],
        headers,
        '',
      ),
    ).resolves.toBe(false);
  });

  it('it should return error when no exists fakeAccounts on fakeAccountUpdate method', async () => {
    const headers = new RecipientHeaderDto();
    headers.setIsSandbox(true);
    expect(
      recipientService.fakeAccountsUpdate(
        mockInvalidAccoutToPatch,
        [],
        headers,
        '',
      ),
    ).rejects.toThrow(new Error('Not Found'));
  });

  it('it should return error when input recipients was empty on getRealAccount method', async () => {
    const recipients = [];
    expect(recipientService.getRealAccount(recipients)).rejects.toThrow(
      new Error('Not Found'),
    );
  });

  it('it should return error when input recipients was empty on getRealAccount method', async () => {
    const recipients = [];
    expect(recipientService.getFakeAccounts(recipients)).rejects.toThrow(
      new Error('Not Found'),
    );
  });

  it('it should return empty array when input recipients was no fakeAccounts on getFakeAccount method', async () => {
    const recipients = [{ contaBancaria: '237' }];
    const fakeAccounts = [];
    expect(recipientService.getFakeAccounts(recipients)).resolves.toStrictEqual(
      fakeAccounts,
    );
  });

  it('it should return empty array when input recipients was no accounts on getFakeAccount method', async () => {
    const recipients = [{ contaBancaria: null }];
    const fakeAccounts = [];
    expect(recipientService.getFakeAccounts(recipients)).resolves.toStrictEqual(
      fakeAccounts,
    );
  });

  it('it should return false when input recipients was empty account on getRealAccount method', async () => {
    const recipients = [{ contaBancaria: null }];
    expect(recipientService.getRealAccount(recipients)).resolves.toBe(false);
  });
});
