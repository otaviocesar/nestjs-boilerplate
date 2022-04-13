import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
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
  ApiHeader,
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
  @ApiOperation({ summary: 'Find users' })
  @ApiHeader({
    name: 'Authorization',
    description: 'User access token',
  })
  @ApiOkResponse({ description: 'Success.', type: FindUserDto, isArray: true })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Get()
  async findAll(@Res() request): Promise<FindUserDto[]> {
    const users = await this.userServicePort.findAll();
    return request.status(HttpStatus.OK).json(users);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Find user by id' })
  @ApiHeader({
    name: 'Authorization',
    description: 'User access token',
  })
  @ApiOkResponse({ description: 'Success.', type: FindUserDto })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Get(':id')
  public async getById(
    @Res() request,
    @Param('id') id: string,
  ): Promise<FindUserDto> {
    const user = await this.userServicePort.getById(id);
    return request.status(HttpStatus.OK).json(user);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created!',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Post()
  async save(
    @Res() request,
    @Body() user: CreateUserDto,
  ): Promise<CreateUserDto> {
    const userCreated = await this.userServicePort.save(user);
    return request.status(HttpStatus.CREATED).json(userCreated);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'User access token',
  })
  @ApiOkResponse({ description: 'The record has been successfully updated!' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Put(':id')
  async update(
    @Res() request,
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const userUpdated = await this.userServicePort.update(id, user);
    return request.status(HttpStatus.OK).json(userUpdated);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiHeader({
    name: 'Authorization',
    description: 'User access token',
  })
  @ApiOkResponse({ description: 'The record has been successfully deleted!' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  @Delete(':id')
  async delete(@Res() request, @Param('id') id: string): Promise<UserDto> {
    const user = await this.userServicePort.delete(id);
    return request.status(HttpStatus.OK).json(user);
  }
}
