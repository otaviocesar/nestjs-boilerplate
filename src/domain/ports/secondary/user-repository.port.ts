import User from '../../entities/user/user.dto';
import Auth from '../../entities/auth/auth.dto';
import CreateUserDto from '../../entities/user/create-user.dto';

export interface UserRepositoryPort {
  save(user: CreateUserDto): Promise<CreateUserDto>;

  findAll(): Promise<User[]>;

  findById(id: string): Promise<User>;

  update(id: string, user: User): void;

  delete(id: string): void;

  findByEmail(email: string): Promise<Auth>;
}
