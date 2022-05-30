import User from '../../domain/entities/user/user.dto';
import FindUserDto from '../../domain/entities/user/find-user.dto';
import { UserEntity } from '../adapters/repositories/mongodb/entities/user.entity';

export default class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    const user = new User();
    user.setId(userEntity.id);
    user.setName(userEntity.name);
    user.setEmail(userEntity.email);
    user.setPassword(userEntity.password);
    return user;
  }

  public static async toCreateDomain(userEntity: UserEntity): Promise<User> {
    const user = new User(userEntity.id, userEntity.name, userEntity.email);
    user.setCreateAt(new Date(userEntity.createAt));
    return user;
  }

  public static toUpdateDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
    );
  }

  public static toFindDomain(userEntity: UserEntity): FindUserDto {
    return new FindUserDto(userEntity.id, userEntity.name, userEntity.email);
  }

  public static toFindDomains(usersEntity: UserEntity[]): FindUserDto[] {
    const users = [];
    usersEntity.forEach((userEntity) => {
      const user = UserMapper.toFindDomain(userEntity);
      users.push(user);
    });
    return users;
  }
}
