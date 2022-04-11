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
  Inject
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import User from '../../domain/entities/user/user.dto';

import  { UserServicePort }  from '../../domain/ports/primary/user-service.port';

import { JwtAuthGuard } from '../../infra/auth/jwt/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject('UserServicePort') private userServicePort: UserServicePort,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Find users' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @Get()
  async findAll(@Res() request): Promise<User[]> {
    const users = await this.userServicePort.findAll();
    return request.status(HttpStatus.OK).json(users);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async getById(@Res() request, @Param('id') id: string): Promise<User> {
    const user = await this.userServicePort.getById(id);
    return request.status(HttpStatus.OK).json(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse()
  @ApiForbiddenResponse()
  async save(@Res() request, @Body() user: User): Promise<User> {
    const userCreated = await this.userServicePort.save(user);
    return request.status(HttpStatus.CREATED).json(userCreated);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async update(
    @Res() request,
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User> {
    const userUpdated = await this.userServicePort.update(id, user);
    return request.status(HttpStatus.OK).json(userUpdated);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async delete(@Res() request, @Param('id') id: string): Promise<User> {
    const user = await this.userServicePort.delete(id);
    return request.status(HttpStatus.OK).json(user);
  }
}
