import { Injectable } from '@nestjs/common';
import DomainUserService from '../../domain/entities/user/user.service';
import InMemoryUserRepository from '../../infra/adapters/repositories/inmemory-repository/inmemory.user.repository';
import ConsoleNotifier from '../../infra/adapters/logging/console.notifier';
import UserServiceApi from '../../infra/ports/primary/user.service.api';
import UserDto from '../../domain/entities/user/user.dto';
import UserMapper from '../../domain/entities/user/user.mapper';
import UserModel from '../../domain/entities/user/model/user.model';

@Injectable()
export class UserService {
  private userService: UserServiceApi;

  /**
   * This is the point where the concrete implementation InMemoryMouseRepository and ConsoleNotifier
   * are instantiated and set int eh domain
   * instead of direct instantiation we can use some logic based on environment variable/config to determine
   * which concrete classes to use
   * for example if we run on both AWS and Azure and have different implementations we should read it
   * from an environment variable
   */
  constructor() {
    this.userService = new DomainUserService(
      new InMemoryUserRepository(),
      new ConsoleNotifier(),
    );
  }

  public getUsers(): UserDto[] {
    return this.userService
      .getAllUsers()
      .map((userDomain) => UserMapper.toDto(userDomain));
  }

  public addUser(userDto: UserDto): void {
    const userDomain: UserModel = UserMapper.toDomain(userDto);
    this.userService.addUser(userDomain);
  }
}
