import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app/app.module';
import * as jwt from 'jsonwebtoken';
import UserFactory from '../../src/infra/factories/user.factory';
import { SECRET_JWT } from '../../src/infra/environments/index';

describe('AppController (integration)', () => {
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

  const mockUser = UserFactory.validUserToCreate();

  const mockInvalidUser = UserFactory.invalidUser();

  describe('/users (POST)', () => {
    it('it should register a user and return the new user object', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json; charset=utf-8')
        .send(mockUser)
        .expect(HttpStatus.CREATED);
    });

    it('it should not register a new user if the passed email already exists', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json; charset=utf-8')
        .send(mockUser)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('/auth/login (POST)', () => {
    it('it should not log in nor return a JWT for an unregistered user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json; charset=utf-8')
        .send({
          email: mockInvalidUser.getPassword(),
          password: mockInvalidUser.getPassword(),
        })
        .expect((response: request.Response) => {
          const { access_token }: { access_token: string } = response.body;
          expect(access_token).toBeUndefined();
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('it should log in and return a JWT for a registered user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json; charset=utf-8')
        .send({ email: mockUser.getEmail(), password: mockUser.getPassword() })
        .expect((response: request.Response) => {
          const { access_token }: { access_token: string } = response.body;
          expect(jwt.verify(access_token, SECRET_JWT)).toBeTruthy();
        })
        .expect(HttpStatus.OK);
    });
  });

  describe('/users (GET)', () => {
    it('it should return unauthorized if it makes a request without authorization token', () => {
      return request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json; charset=utf-8')
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
