import Auth from '../../domain/entities/auth/auth.dto';
import { UserEntity } from '../adapters/repositories/mongodb/entities/user.entity';

export default class AuthMapper {
  public static toDomain(userEntity: UserEntity): Auth {
    const user = new Auth(userEntity.email, userEntity.password);
    return user;
  }
}
