import UserModel from './model/user.model';
import UserServiceApi from '../../../infra/ports/primary/user.service.api';
import UserRepository from '../../../infra/ports/secondary/user.repository';
import Notifier from '../../../infra/ports/secondary/notifier';

/**
 * Pure DOMAIN logic
 * no dependencies on INFRASTRUCTURE or IDE
 */
export default class DomainUserService implements UserServiceApi {
  constructor(
    private userRepository: UserRepository,
    private customerNotifier: Notifier,
  ) {}

  public getAllUsers(): UserModel[] {
    return this.userRepository.getAll();
  }

  public addUser(user: UserModel): void {
    this.customerNotifier.notify(`I am adding a new user ${user.name}`);
  }
}
