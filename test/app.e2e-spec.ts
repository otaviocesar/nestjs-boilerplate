import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import * as jwt from 'jsonwebtoken';
import User from '../src/domain/entities/user/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { SECRET_JWT } from '../src/infra/environments/index';

describe('AppController (e2e)', () => {
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

  const mockUser = new User();
  mockUser.setId('');
  mockUser.setName('Nome');
  mockUser.setEmail(uuidv4() + '@dominio.com');
  mockUser.setPassword('password');

  describe('/users (POST)', () => {
    it('it should register a user and return the new user object', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json')
        .send(mockUser)
        .expect((response: request.Response) => {
          const { id, name, password, email } = response.body;
          expect(typeof id).toBe('string'),
            expect(name).toEqual(mockUser.getName()),
            expect(email).toEqual(mockUser.getEmail()),
            expect(password).toBeUndefined();
        })
        .expect(HttpStatus.CREATED);
    });

    it('it should not register a new user if the passed email already exists', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json')
        .send(mockUser)
        .expect(HttpStatus.CONFLICT);
    });
  });

  describe('/auth/login (POST)', () => {
    it('it should not log in nor return a JWT for an unregistered user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'doesnot@exist.com', password: 'password' })
        .expect((response: request.Response) => {
          const { access_token }: { access_token: string } = response.body;
          expect(access_token).toBeUndefined();
        })
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('it should log in and return a JWT for a registered user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json')
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
        .set('Accept', 'application/json')
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
