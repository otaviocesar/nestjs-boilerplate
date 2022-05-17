import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/app/services/user.service';
import { UserRepository } from '../../../src/infra/adapters/repositories/mongodb/user.repository';
import UserFactory from '../../../src/infra/factories/user.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../src/infra/adapters/repositories/mongodb/schemas/user.schema';
import { MONGO_URL } from '../../../src/infra/environments/index';
import { v4 as uuidv4 } from 'uuid';

const mockUser = UserFactory.validUserToCreate();

describe('UserService', () => {
  let userService: UserService;
  jest.setTimeout(20000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        MongooseModule.forRoot(MONGO_URL),
      ],
      providers: [
        {
          provide: 'UserServicePort',
          useClass: UserService,
        },
        {
          provide: 'UserRepositoryPort',
          useClass: UserRepository,
        },
      ],
    }).compile();

    userService = module.get('UserServicePort');
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('it should save a user', async () => {
    const savedUser = await userService.save(mockUser);

    expect(savedUser).toEqual({
      id: expect.any(String),
      createAt: expect.any(Date),
      password: undefined,
      name: mockUser.getName(),
      email: mockUser.getEmail(),
    });
  });

  it('it should getById a existing user', async () => {
    const allUsers = await userService.findAll();
    const firstUser = allUsers[0];
    const userId = firstUser?.getId();

    const userFound = await userService.getById(userId);

    expect(userFound).toMatchObject({ name: firstUser?.getName() });
  });

  it('it should update a existing user', async () => {
    mockUser.setEmail(uuidv4() + '@dominio.com');
    const savedUser = await userService.save(mockUser);
    const userId = savedUser?.getId();
    const mockUpdateUser = UserFactory.validUserToUpdate(userId);

    const updatedUser = await userService.update(userId, mockUpdateUser);

    expect(updatedUser).toMatchObject({ id: userId });

    const updatedUserFound = await userService.getById(userId);

    expect(updatedUserFound).toMatchObject({
      id: mockUpdateUser.getId(),
      name: mockUpdateUser.getName(),
      email: mockUpdateUser.getEmail(),
    });
  });

  it('it should delete a existing user', async () => {
    mockUser.setEmail(uuidv4() + '@dominio.com');
    const savedUser = await userService.save(mockUser);
    const userId = savedUser?.getId();

    const deletedUser = await userService.delete(userId);

    expect(deletedUser).toMatchObject({ id: userId });

    await expect(userService.getById(userId)).rejects.toEqual(
      new NotFoundException({ message: 'Not Found', status: 404 }),
    );
  });

  it('it should return Not Found if there is no user with the given id', async () => {
    const userInvalidId = uuidv4();
    await expect(userService.getById(userInvalidId)).rejects.toEqual(
      new NotFoundException({ message: 'Not Found', status: 404 }),
    );
  });
});
