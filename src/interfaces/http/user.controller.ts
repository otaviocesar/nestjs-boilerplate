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

import { UserService } from '../../app/services/user.service';

import { JwtAuthGuard } from '../../infra/auth/jwt/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find users' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  @Get()
  async findAll(@Res() request): Promise<User[]> {
    const users = await this.userService.findAll();
    return request.status(HttpStatus.OK).json(users);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  public async getById(@Res() request, @Param('id') id: string): Promise<User> {
    const user = await this.userService.getById(id);
    return request.status(HttpStatus.OK).json(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse()
  @ApiForbiddenResponse()
  async create(@Res() request, @Body() user: User): Promise<User> {
    const userCreated = await this.userService.create(user);
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
    const userUpdated = await this.userService.update(id, user);
    return request.status(HttpStatus.OK).json(userUpdated);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async delete(@Res() request, @Param('id') id: string): Promise<User> {
    const user = await this.userService.delete(id);
    return request.status(HttpStatus.OK).json(user);
  }
}
