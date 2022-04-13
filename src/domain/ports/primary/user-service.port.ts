import Auth from '../../entities/auth/auth.dto';
import CreateUserDto from '../../entities/user/create-user.dto';
import UpdateUserDto from '../../entities/user/update-user.dto';
import FindUserDto from '../../entities/user/find-user.dto';

export interface UserServicePort {
  save(user: CreateUserDto): void;

  findAll(): Promise<FindUserDto[]>;

  getById(id: string): Promise<FindUserDto>;

  update(id: string, user: UpdateUserDto): void;

  delete(id: string): void;

  findByEmail(email: string): Promise<Auth>;
}
