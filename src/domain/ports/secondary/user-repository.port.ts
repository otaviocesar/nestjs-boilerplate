import Auth from '../../entities/auth/auth.dto';
import UserDto from '../../entities/user/user.dto';
import CreateUserDto from '../../entities/user/create-user.dto';
import UpdateUserDto from '../../entities/user/update-user.dto';
import FindUserDto from '../../entities/user/find-user.dto';

export interface UserRepositoryPort {
  save(user: CreateUserDto): Promise<CreateUserDto>;

  findAll(): Promise<FindUserDto[]>;

  findById(id: string): Promise<FindUserDto>;

  update(id: string, user: UpdateUserDto): Promise<UpdateUserDto>;

  delete(id: string): Promise<UserDto>;

  findByEmail(email: string): Promise<Auth>;
}
