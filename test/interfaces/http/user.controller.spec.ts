import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/interfaces/http/user.controller';
import { UserService } from '../../../src/app/services/user.service';
import { UserRepository } from '../../../src/infra/adapters/repositories/mongodb/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../src/infra/adapters/repositories/mongodb/schemas/user.schema';
import { MONGO_URL } from '../../../src/infra/environments/index';
import { v4 as uuidv4 } from 'uuid';
import UserFactory from '../../../src/infra/factories/user.factory';
import { NotFoundException } from '@nestjs/common';

const mockUser = UserFactory.validUserToCreate();

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

  it('it should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('it should save a user', async () => {
    const savedUser = await userController.save(mockUser);

    expect(savedUser).toEqual({
      id: expect.any(String),
      createAt: expect.any(Date),
      password: undefined,
      name: mockUser.getName(),
      email: mockUser.getEmail(),
    });
  });

  it('it should getById a existing user', async () => {
    const allUsers = await userController.findAll();
    const firstUser = allUsers[0];
    const userId = firstUser?.getId();
    const userParams = { id: userId };

    const userFound = await userController.getById(userParams);

    expect(userFound).toMatchObject({ name: firstUser?.getName() });
  });

  it('it should update a existing user', async () => {
    mockUser.setEmail(uuidv4() + '@dominio.com');
    const savedUser = await userController.save(mockUser);
    const userId = savedUser?.getId();
    const userParams = { id: userId };
    const mockUpdateUser = UserFactory.validUserToUpdate(userId);

    const updatedUser = await userController.update(userParams, mockUpdateUser);

    expect(updatedUser).toMatchObject({ id: userId });

    const updatedUserFound = await userController.getById(userParams);

    expect(updatedUserFound).toMatchObject({
      id: mockUpdateUser.getId(),
      name: mockUpdateUser.getName(),
      email: mockUpdateUser.getEmail(),
    });
  });

  it('it should delete a existing user', async () => {
    mockUser.setEmail(uuidv4() + '@dominio.com');
    const savedUser = await userController.save(mockUser);
    const userId = savedUser?.getId();
    const userParams = { id: userId };

    const deletedUser = await userController.delete(userParams);

    expect(deletedUser).toMatchObject({ id: userId });

    await expect(userController.getById(userParams)).rejects.toEqual(
      new NotFoundException({ message: 'Not Found', status: 404 }),
    );
  });

  it('it should return Not Found if there is no user with the given id', async () => {
    const userInvalidId = uuidv4();
    await expect(userController.getById(userInvalidId)).rejects.toEqual(
      new NotFoundException({ message: 'Not Found', status: 404 }),
    );
  });
});
