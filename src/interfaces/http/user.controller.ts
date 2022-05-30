import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Body,
  Param,
  UseGuards,
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import UserDto from '../../domain/entities/user/user.dto';
import FindUserDto from '../../domain/entities/user/find-user.dto';
import UserParamDto from '../../domain/entities/user/user-param.dto';

import { UserServicePort } from '../../domain/ports/primary/user-service.port';

import { JwtAuthGuard } from '../../infra/auth/jwt/jwt-auth.guard';
import { CustomValidationPipe } from '../../infra/exceptions/validation.pipe';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject('UserServicePort') private userServicePort: UserServicePort,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Find users' })
  @ApiOkResponse({ description: 'Success.', type: FindUserDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<FindUserDto[]> {
    return this.userServicePort.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiOkResponse({ description: 'Success.', type: FindUserDto })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getById(@Param() params: UserParamDto): Promise<FindUserDto> {
    return this.userServicePort.getById(params.id);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created!',
    type: UserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async save(
    @Body(new CustomValidationPipe()) user: UserDto,
  ): Promise<UserDto> {
    return this.userServicePort.save(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ description: 'The record has been successfully updated!' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(
    @Param() params: UserParamDto,
    @Body(new CustomValidationPipe()) user: UserDto,
  ): Promise<UserDto> {
    return this.userServicePort.update(params.id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: 'The record has been successfully deleted!' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(@Param() params: UserParamDto): Promise<UserDto> {
    return this.userServicePort.delete(params.id);
  }
}
