import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../src/interfaces/http/user.controller';
import { UserService } from '../../../src/app/services/user.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
  });

  describe('users testing', () => {
    it('should return a list of famous users', () => {
      expect(userController.getUsers()).toEqual([
        { email: 'primeiro@teste.com', name: 'Otavio' },
        { email: 'segundo@teste.com', name: 'Cesar' },
        { email: 'terceiro@teste.com', name: 'Julio' },
        { email: 'quarto@teste.com', name: 'Liz' },
        { email: 'quinto@teste.com', name: 'Ana' },
      ]);
    });

    it('print a message to the console', () => {
      expect(() => {
        userController.addUsers({ name: 'Liz', email: 'quarto@teste.com' });
      }).not.toThrow('error');
    });
  });
});
