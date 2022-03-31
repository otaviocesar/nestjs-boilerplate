import UserMapper from '../../../mappers/user.mapper';
import UserModel from '../../../../domain/entities/user/model/user.model';
import UserRepository from '../../../ports/secondary/user.repository';
import UserEntity from './inmemory.user.entity';

export default class InMemoryUserRepository implements UserRepository {
  private users: UserEntity[];

  constructor() {
    const createdTimestamp = Date();
    this.users = [
      {
        name: 'Otavio',
        email: 'primeiro@teste.com',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Cesar',
        email: 'segundo@teste.com',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Julio',
        email: 'terceiro@teste.com',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Liz',
        email: 'quarto@teste.com',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Ana',
        email: 'quinto@teste.com',
        cratedAt: createdTimestamp,
      },
    ];
  }

  public getAll(): UserModel[] {
    return this.users.map((userEntity) => UserMapper.toDomain(userEntity));
  }
}
