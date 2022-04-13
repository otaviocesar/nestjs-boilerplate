import { UserServicePort } from '../../domain/ports/primary/user-service.port';
import { AuthServicePort } from '../../domain/ports/primary/auth-service.port';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements AuthServicePort {
  constructor(
    @Inject('UserServicePort') private userServicePort: UserServicePort,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userServicePort.findByEmail(userEmail);
    if (user && user.getPassword() === userPassword) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid Password!');
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
