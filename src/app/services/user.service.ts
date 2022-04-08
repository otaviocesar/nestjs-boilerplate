import { Injectable } from '@nestjs/common';

import User from '../../domain/entities/user/user.dto';
import { UserRepository } from '../../infra/adapters/repositories/mongodb/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async getById(id: string) {
    return this.userRepository.findById(id);
  }

  async update(id: string, user: User) {
    return this.userRepository.update(id, user);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }

  async findByEmail(email: string) {
    return this.userRepository.findByEmail(email);
  }
}
