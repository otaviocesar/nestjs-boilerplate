import Auth from '../../../domain/entities/auth/auth.dto';

export interface AuthServicePort {
  validateUser(userEmail: string, userPassword: string): Promise<Auth>;
  login(user: any): void;
}
