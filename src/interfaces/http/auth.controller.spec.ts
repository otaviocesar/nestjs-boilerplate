import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../../app/services/auth.service';
import { UserRepository } from '../../infra/adapters/repositories/mongodb/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../infra/adapters/repositories/mongodb/schemas/user.schema';
import { MONGO_URL } from '../../infra/environments/index';
import { v4 as uuidv4 } from 'uuid';
import AuthDto from '../../domain/entities/auth/auth.dto';
import { LocalStrategy } from '../../infra/auth/jwt/local.strategy';
import { JwtStrategy } from '../../infra/auth/jwt/jwt.strategy';
import CreateUserDto from '../../domain/entities/user/create-user.dto';
import { UserController } from '../../interfaces/http/user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../../app/services/user.service';
import { SECRET_JWT } from '../../infra/environments';

const mockAuth = new AuthDto();
const mockUser = new CreateUserDto();

describe('AuthController', () => {
  let authController: AuthController;
  let userController: UserController;
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
      controllers: [AuthController, UserController],
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
    }).compile();
    userController = module.get<UserController>(UserController);
    authController = module.get<AuthController>(AuthController);
  });

  it('it should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('it should create a user and log in', async () => {
    const email = uuidv4() + '@dominio.com';
    const password = uuidv4();
    mockUser.setName('Name');
    mockUser.setEmail(email);
    mockUser.setPassword(password);
    const savedUser = await userController.save(mockUser);

    expect(savedUser).toEqual({
      id: expect.any(String),
      createAt: expect.any(Date),
      password: undefined,
      name: mockUser.getName(),
      email: email,
    });

    mockAuth.setEmail(email);
    mockAuth.setPassword(password);

    const loggedUser = await authController.login(mockAuth);

    expect(loggedUser).toEqual({
      access_token: expect.any(String),
    });
  });
});
