import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/app/services/auth.service';
import { UserRepository } from '../../../src/infra/adapters/repositories/mongodb/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../src/infra/adapters/repositories/mongodb/schemas/user.schema';
import { MONGO_URL } from '../../../src/infra/environments/index';
import AuthDto from '../../../src/domain/entities/auth/auth.dto';
import { LocalStrategy } from '../../../src/infra/auth/jwt/local.strategy';
import { JwtStrategy } from '../../../src/infra/auth/jwt/jwt.strategy';
import UserFactory from '../../../src/infra/factories/user.factory';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../../../src/app/services/user.service';
import { SECRET_JWT } from '../../../src/infra/environments';

const mockAuth = new AuthDto();
const mockUser = UserFactory.validUserToCreate();

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forRoot(MONGO_URL),
        PassportModule,
        JwtModule.register({
          secret: SECRET_JWT,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        {
          provide: 'AuthServicePort',
          useClass: AuthService,
        },
        {
          provide: 'UserServicePort',
          useClass: UserService,
        },
        {
          provide: 'UserRepositoryPort',
          useClass: UserRepository,
        },
        LocalStrategy,
        JwtStrategy,
      ],
      exports: [
        {
          provide: 'UserServicePort',
          useClass: UserService,
        },
      ],
    }).compile();
    userService = module.get('UserServicePort');
    authService = module.get('AuthServicePort');
  });

  it('it should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('it should create a user and log in', async () => {
    const savedUser = await userService.save(mockUser);

    expect(savedUser).toEqual({
      id: expect.any(String),
      createAt: expect.any(Date),
      password: undefined,
      name: mockUser.getName(),
      email: mockUser.getEmail(),
    });

    mockAuth.setEmail(mockUser.getEmail());
    mockAuth.setPassword(mockUser.getPassword());

    const loggedUser = await authService.login(mockAuth);

    expect(loggedUser).toEqual({
      access_token: expect.any(String),
    });
  });
});
