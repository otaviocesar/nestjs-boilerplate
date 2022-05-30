import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import RecipientFactory from '../../src/infra/factories/recipient.factory';

describe('Recipient (integration)', () => {
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

  const mockInvalidAccoutToPatch = RecipientFactory.invalidAccountToPatch();
  const mockAccountToPatch = RecipientFactory.validAccountToPatch();

  describe('/recipients (PATCH)', () => {
    it('it should update bank account of all recipients with cpfCnpj informed', () => {
      return request(app.getHttpServer())
        .patch('/recipients')
        .set('Accept', 'application/json; charset=utf-8')
        .set('is_sandbox', 'true')
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .send(mockAccountToPatch)
        .expect((response: request.Response) => {
          const { httpClientTrackingId } = response.body;
          expect(typeof httpClientTrackingId).toBe('string');
        })
        .expect(HttpStatus.OK);
    });

    it('it should not update bank account if no mall is provided', () => {
      return request(app.getHttpServer())
        .patch('/recipients')
        .set('Accept', 'application/json; charset=utf-8')
        .set('is_sandbox', 'true')
        .set('mall', null)
        .send(mockInvalidAccoutToPatch)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('it should return error if no body is provided', () => {
      return request(app.getHttpServer())
        .patch('/recipients')
        .set('Accept', 'application/json; charset=utf-8')
        .set('is_sandbox', 'true')
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('it should return error if invalid body is provided', () => {
      return request(app.getHttpServer())
        .patch('/recipients')
        .set('Accept', '')
        .set('is_sandbox', 'true')
        .set('Content-Type', null)
        .set('mall', 'PARQUE_D_PEDRO_SHOPPING')
        .send('')
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
