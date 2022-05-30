import {
  Inject,
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthServicePort } from '../../domain/ports/primary/auth-service.port';
import AuthDto from '../../domain/entities/auth/auth.dto';
import { LocalAuthGuard } from '../../infra/auth/jwt/local-auth.guard';
import { CustomValidationPipe } from '../../infra/exceptions/validation.pipe';

@ApiTags('login')
@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServicePort') private authServicePort: AuthServicePort,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'Login successfully done!', type: AuthDto })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body(new CustomValidationPipe()) auth: AuthDto): Promise<any> {
    return this.authServicePort.login(auth);
  }
}
