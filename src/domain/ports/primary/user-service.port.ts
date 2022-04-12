import User from '../../entities/user/user.dto';
import Auth from '../../entities/auth/auth.dto';
import CreateUserDto from '../../entities/user/create-user.dto';

export interface UserServicePort {
  save(user: CreateUserDto): void;

  findAll(): Promise<User[]>;

  getById(id: string): Promise<User>;

  update(id: string, user: User): void;

  delete(id: string): void;

  findByEmail(email: string): Promise<Auth>;
}
