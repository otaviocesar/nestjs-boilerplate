import UserModel from '../../domain/entities/user/model/user.model';
import UserEntity from '../adapters/repositories/inmemory-repository/inmemory.user.entity';

export default class InfraUserMapper {
  public static toDomain(userEntity: UserEntity): UserModel {
    return new UserModel(userEntity.name, userEntity.email);
  }
}
