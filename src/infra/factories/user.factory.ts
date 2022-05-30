import User from '../../domain/entities/user/user.dto';
import { v4 as uuidv4 } from 'uuid';

export default class UserFactory {
  static validUserToCreate(): User {
    const user = new User();
    user.setName('Nome');
    user.setEmail(uuidv4() + '@dominio.com');
    user.setPassword(uuidv4());
    return user;
  }

  static validUserToUpdate(userId: string): User {
    const user = new User();
    user.setId(userId);
    user.setName('New Name');
    user.setEmail(uuidv4() + '@dominio.com');
    user.setPassword('NewPassword');
    return user;
  }

  static invalidUser(): User {
    const user = new User();
    user.setId('');
    user.setName('Nome');
    user.setEmail('doesnot@exist.com');
    user.setPassword(uuidv4());
    return user;
  }
}
