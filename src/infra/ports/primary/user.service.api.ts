import UserModel from '../../../domain/entities/user/model/user.model';

/**
 * Primary ports represent the interface between APPLICATION -> DOMAIN
 */
export default interface UserServiceApi {
  getAllUsers(): UserModel[];
  addUser(user: UserModel): void;
}
