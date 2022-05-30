import Auth from '../../entities/auth/auth.dto';
import UserDto from '../../entities/user/user.dto';
import FindUserDto from '../../entities/user/find-user.dto';

export interface UserServicePort {
  save(user: UserDto): Promise<UserDto>;

  findAll(): Promise<FindUserDto[]>;

  getById(id: string): Promise<FindUserDto>;

  update(id: string, user: UserDto): Promise<UserDto>;

  delete(id: string): Promise<UserDto>;

  findByEmail(email: string): Promise<Auth>;
}
