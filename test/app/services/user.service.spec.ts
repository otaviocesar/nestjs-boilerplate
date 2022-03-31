import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/app/services/user.service';
import UserDto from '../../../src/domain/entities/user/user.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', () => {
    expect(service.getUsers()).toEqual([
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
    ]);
  });

  it('should not throw exception when adding a new user', () => {
    const newUser = new UserDto('Test User', 'sexto@teste.com');
    expect(() => service.addUser(newUser)).not.toThrow();
  });
});
