import { AuthService } from '../../app/services/auth.service';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../../infra/jwt/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('login')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
