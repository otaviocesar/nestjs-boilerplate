import User from '../../domain/entities/user/user.dto';
import CreateUserDto from '../../domain/entities/user/create-user.dto';
import UpdateUserDto from '../../domain/entities/user/update-user.dto';
import FindUserDto from '../../domain/entities/user/find-user.dto';
import { UserEntity } from '../adapters/repositories/mongodb/entities/user.entity';

export default class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    const user = new User(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
    );
    return user;
  }

  public static async toCreateDomain(
    userEntity: UserEntity,
  ): Promise<CreateUserDto> {
    const user = new CreateUserDto(
      userEntity.id,
      userEntity.name,
      userEntity.email,
    );

    user.setCreateAt(new Date(userEntity.createAt));
    return user;
  }

  public static toUpdateDomain(userEntity: UserEntity): UpdateUserDto {
    const user = new UpdateUserDto(
      userEntity.id,
      userEntity.name,
      userEntity.email,
      userEntity.password,
    );
    return user;
  }

  public static toFindDomain(userEntity: UserEntity): FindUserDto {
    const user = new FindUserDto(
      userEntity.id,
      userEntity.name,
      userEntity.email,
    );
    return user;
  }

  public static toFindDomains(usersEntity: UserEntity[]): FindUserDto[] {
    const users = new Array<FindUserDto>();
    usersEntity.forEach((userEntity) => {
      const user = this.toFindDomain(userEntity);
      users.push(user);
    });
    return users;
  }
}
