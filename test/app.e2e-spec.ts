import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { GenericContainer, Wait } from 'testcontainers';
import { AppModule } from '../src/app/app.module';
import * as jwt from 'jsonwebtoken';
import User from '../src/domain/entities/user/user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let container;
  const portMongo = 27017;
  jest.setTimeout(30000);

  beforeAll(async (done) => {
    container = await new GenericContainer('mongo')
      .withExposedPorts(portMongo)
      .withWaitStrategy(Wait.forLogMessage('Listening on 0.0.0.0'))
      .start();
    done();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async (done) => {
    container.stop();
    done();
  });

  afterAll(async () => {
    await app.close();
  });

  const mockUser = new User('name', 'email@homtail.com', 'password', '');

  describe('/users (POST)', () => {
    it('it should register a user and return the new user object', () => {
      return request(app.getHttpServer())
        .post('/users')
        .set('Accept', 'application/json')
        .send(mockUser)
        .expect((response: request.Response) => {
          const { id, name, password, email } = response.body;

          expect(typeof id).toBe('number'),
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
          const { token }: { token: string } = response.body;

          expect(token).toBeUndefined();
        })
        .expect(HttpStatus.FORBIDDEN);
    });

    it('it should log in and return a JWT for a registered user', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('Accept', 'application/json')
        .send(mockUser)
        .expect((response: request.Response) => {
          const { token }: { token: string } = response.body;

          expect(jwt.verify(token, 'jwtsecret')).toBeTruthy();
        })
        .expect(HttpStatus.OK);
    });
  });
});
