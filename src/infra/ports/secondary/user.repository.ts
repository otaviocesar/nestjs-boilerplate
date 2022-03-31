import UserModel from '../../../domain/entities/user/model/user.model';

/**
 * Secondary ports represent the interface between DOMAIN -> INFRASTRUCTURE
 */
export default interface UserRepository {
  getAll(): UserModel[];
}
