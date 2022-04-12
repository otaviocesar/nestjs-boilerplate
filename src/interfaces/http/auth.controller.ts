import {
  Inject,
  Controller,
  Post,
  UseGuards,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from '../../infra/auth/jwt/local-auth.guard';
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

@ApiTags('login')
@Controller()
export class AuthController {
  constructor(
    @Inject('AuthServicePort') private authServicePort: AuthServicePort,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'Login successfully done!' })
  @ApiBadRequestResponse({ description: 'Data entered incorrectly.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async save(@Res() request, @Body() auth: AuthDto): Promise<AuthDto> {
    const loggedUser = await this.authServicePort.login(auth);
    return request.status(HttpStatus.OK).json(loggedUser);
  }
}
