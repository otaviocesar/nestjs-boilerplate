import User from '../../domain/entities/user/user.dto';
import { UserEntity } from '../adapters/repositories/mongodb/entities/user.entity';

export default class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
    );

    user.setCreateAt(new Date(userEntity.createAt));
    return user;
  }

  public static toDomains(usersEntity: UserEntity[]): User[] {
    const users = new Array<User>();
    usersEntity.forEach((userEntity) => {
      const user = this.toDomain(userEntity);
      users.push(user);
    });
    return users;
  }
}
