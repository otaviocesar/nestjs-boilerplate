import UserModel from './model/user.model';
import UserDto from './user.dto';

/**
 * The APPLICATION layer is using the format <object>Dto to represent application data
 * The DOMAIN layer is using the format <object>Model to represent model data
 * The INFRASTRUCTURE layer is using the format <object>Entity to represent repository
 */
export default class AppUserMapper {
  public static toDomain(userDto: UserDto): UserModel {
    return new UserModel(userDto.name, userDto.email);
  }

  public static toDto(userDomain: UserModel): UserDto {
    return new UserDto(userDomain.name, userDomain.email);
  }
}
