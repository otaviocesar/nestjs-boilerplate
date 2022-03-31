import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import UserDto from '../src/domain/entities/user/user.dto';

const users: UserDto[] = [
  {
    name: 'Otavio',
    email: 'primeiro@teste.com',
  },
  {
    name: 'Cesar',
    email: 'segundo@teste.com',
  },
  {
    name: 'Julio',
    email: 'terceiro@teste.com',
  },
  {
    name: 'Liz',
    email: 'quarto@teste.com',
  },
  {
    name: 'Ana',
    email: 'quinto@teste.com',
  },
];

const api = '/users';

describe('AppController (e2e)', () => {
  let app: INestApplication;

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

  describe('e2e', () => {
    describe('users api', () => {
      it('should get the user array', () => {
        return request(app.getHttpServer())
          .get(api)
          .expect(200)
          .expect((res) => {
            console.log(res.body);
            expect(res.body).toEqual(users);
          });
      });
    });
  });
});
