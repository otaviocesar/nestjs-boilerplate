import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/interfaces/http/user.controller';
import { UserService } from '../src/app/services/user.service';
import { UserRepository } from '../src/infra/adapters/repositories/mongodb/user.repository';
import UserDto from '../src/domain/entities/user/user.dto';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../src/infra/adapters/repositories/mongodb/schemas/user.schema';
import { MONGO_URL } from '../src/infra/environments/index';
import { v4 as uuidv4 } from 'uuid';
import CreateUserDto from '../src/domain/entities/user/create-user.dto';

const mockUser = new CreateUserDto();
mockUser.setName('Nome');
mockUser.setEmail(uuidv4() + '@dominio.com');
mockUser.setPassword('password');

const userList: UserDto[] = [];

describe('UserController', () => {
  let userController: UserController;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forRoot(MONGO_URL),
      ],
      controllers: [UserController],
      providers: [
        {
          provide: 'UserServicePort',
          useValue: {
            findUsers: jest.fn().mockResolvedValue(userList),
            createUser: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
            update: jest.fn(),
          },
          useClass: UserService,
        },
        {
          provide: 'UserRepositoryPort',
          useClass: UserRepository,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should save a user', async () => {
    // Act
    const result = await userController.save(mockUser);
    console.log(result);
    // Assert
    expect(result).toEqual({
      id: expect.any(String),
      createAt: expect.any(Date),
      password: undefined,
      name: mockUser.getName(),
      email: mockUser.getEmail(),
    });
  });

  it('should find a existing user', async () => {
    const allUsers = await userController.findAll();
    const firstUser = allUsers[0];
    const userId = firstUser?.getId();
    // Act
    const userFound = await userController.getById(userId);
    // Assert
    expect(userFound).toMatchObject({ name: firstUser?.getName() });
  });
});
