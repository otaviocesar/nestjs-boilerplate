import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import RecipientFactory from '../../src/infra/factories/recipient.factory';

describe('RecipientBandAccount (integration)', () => {
  let app: INestApplication;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const mockAccount = RecipientFactory.validAccountToPost();
  const mockInvalidAccoutToPost = RecipientFactory.invalidAccountToPost();

  describe('/recipient-bank-accounts (POST)', () => {
    it('it should create bank account for recipients with cpfCnpj informed', () => {
      return request(app.getHttpServer())
        .post('/recipient-bank-accounts')
        .set('Accept', 'application/json; charset=utf-8')
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .set('is_sandbox', 'true')
        .send(mockAccount)
        .expect((response: request.Response) => {
          const { httpClientTrackingId } = response.body;
          expect(typeof httpClientTrackingId).toBe('string');
        })
        .expect(HttpStatus.CREATED);
    });

    it('it should not create bank account if request is invalid', () => {
      return request(app.getHttpServer())
        .post('/recipient-bank-accounts')
        .set('Accept', 'application/json; charset=utf-8')
        .set('mall', '')
        .set('is_sandbox', 'true')
        .send(mockInvalidAccoutToPost)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('it should create a valid bank account with tipoDocumento = CPF', () => {
      mockAccount.setTipoDocumento('cpf');
      mockAccount.setCpfCnpj('67164053057');
      return request(app.getHttpServer())
        .post('/recipient-bank-accounts')
        .set('Accept', 'application/json; charset=utf-8')
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .set('is_sandbox', 'true')
        .send(mockAccount)
        .expect((response: request.Response) => {
          const { httpClientTrackingId } = response.body;
          expect(typeof httpClientTrackingId).toBe('string');
        })
        .expect(HttpStatus.CREATED);
    });

    it('it should create a valid bank account with tipoConta = conta_corrente_conjunta  and tipoDocumento = CNPJ', () => {
      mockAccount.setTipoConta('conta_corrente_conjunta');
      return request(app.getHttpServer())
        .post('/recipient-bank-accounts')
        .set('Accept', 'application/json; charset=utf-8')
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .set('is_sandbox', 'true')
        .send(mockAccount)
        .expect((response: request.Response) => {
          const { httpClientTrackingId } = response.body;
          expect(typeof httpClientTrackingId).toBe('string');
        })
        .expect(HttpStatus.CREATED);
    });
    it('it should create a valid bank account with tipoConta = conta_poupanca_conjunta   and tipoDocumento = CPF', () => {
      mockAccount.setTipoConta('conta_poupanca_conjunta');
      mockAccount.setTipoDocumento('cpf');
      mockAccount.setCpfCnpj('67164053057');
      return request(app.getHttpServer())
        .post('/recipient-bank-accounts')
        .set('Accept', 'application/json; charset=utf-8')
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .set('is_sandbox', 'true')
        .send(mockAccount)
        .expect((response: request.Response) => {
          const { httpClientTrackingId } = response.body;
          expect(typeof httpClientTrackingId).toBe('string');
        })
        .expect(HttpStatus.CREATED);
    });
    it('it should return error creating a valid bank account without Content-Type', () => {
      return request(app.getHttpServer())
        .post('/recipient-bank-accounts')
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .set('is_sandbox', 'true')
        .send(mockInvalidAccoutToPost)
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('it should return error creating a valid bank account with header mall', () => {
      return request(app.getHttpServer())
        .post('/recipient-bank-accounts')
        .set('Accept', 'application/json; charset=utf-8')
        .set('is_sandbox', 'true')
        .send(mockInvalidAccoutToPost)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
