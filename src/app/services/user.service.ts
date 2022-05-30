import { Injectable, Inject } from '@nestjs/common';
import { UserServicePort } from '../../domain/ports/primary/user-service.port';

import UserDto from '../../domain/entities/user/user.dto';
import { UserRepositoryPort } from '../../domain/ports/secondary/user-repository.port';

@Injectable()
export class UserService implements UserServicePort {
  constructor(
    @Inject('UserRepositoryPort')
    private userRepositoryPort: UserRepositoryPort,
  ) {}

  async save(user: UserDto): Promise<UserDto> {
    return this.userRepositoryPort.save(user);
  }

  async findAll() {
    return this.userRepositoryPort.findAll();
  }

  async getById(id: string) {
    return this.userRepositoryPort.findById(id);
  }

  async update(id: string, user: UserDto) {
    return this.userRepositoryPort.update(id, user);
  }

  async delete(id: string) {
    return this.userRepositoryPort.delete(id);
  }

  async findByEmail(email: string) {
    return this.userRepositoryPort.findByEmail(email);
  }
}
