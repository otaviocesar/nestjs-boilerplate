import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
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
import User from '../../domain/entities/user/model/user';

import { UserService } from '../../app/services/user.service';

import { JwtAuthGuard } from '../../infra/jwt/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find users' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async getById(@Param('id') id: string): Promise<User> {
    return this.userService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse()
  @ApiForbiddenResponse()
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    user.id = id;
    return this.userService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse()
  @ApiForbiddenResponse()
  async delete(@Param('id') id: string) {
    this.userService.delete(id);
  }
}
