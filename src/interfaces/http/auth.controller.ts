import { AuthService } from '../../app/services/auth.service';
import { Inject, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../infra/auth/jwt/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthServicePort } from '../../domain/ports/primary/auth-service.port';

@ApiTags('login')
@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServicePort') private authServicePort: AuthServicePort,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authServicePort.login(req.user);
  }
}
