import Auth from '../../entities/auth/auth.dto';

export interface AuthRepositoryPort {
  findByEmail(email: string): Promise<Auth>;
}
