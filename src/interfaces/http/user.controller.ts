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
import CreateUserDto from '../../domain/entities/user/create-user.dto';
import FindUserDto from '../../domain/entities/user/find-user.dto';
import UpdateUserDto from '../../domain/entities/user/update-user.dto';

import { UserServicePort } from '../../domain/ports/primary/user-service.port';

import { JwtAuthGuard } from '../../infra/auth/jwt/jwt-auth.guard';

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
    const usersFound = await this.userServicePort.findAll();
    return usersFound;
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
  public async getById(@Param('id') id: string): Promise<FindUserDto> {
    const userFound = await this.userServicePort.getById(id);
    return userFound;
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created!',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async save(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    const userCreated = await this.userServicePort.save(user);
    return userCreated;
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
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const userUpdated = await this.userServicePort.update(id, user);
    return userUpdated;
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
  async delete(@Param('id') id: string): Promise<UserDto> {
    const userDeleted = await this.userServicePort.delete(id);
    return userDeleted;
  }
}
