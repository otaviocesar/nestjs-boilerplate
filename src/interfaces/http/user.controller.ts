import { Controller, Get, Post, Body } from '@nestjs/common';

import { UserService } from '../../app/services/user.service';

import UserDto from '../../domain/entities/user/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getUsers(): UserDto[] {
    return this.userService.getUsers();
  }

  @Post()
  public addUsers(@Body() userDto: UserDto): void {
    this.userService.addUser(userDto);
  }
}
