import User from '../../../../domain/entities/user/user.dto';
import Auth from '../../../../domain/entities/auth/auth.dto';
import CreateUserDto from '../../../../domain/entities/user/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from './entities/user.entity';
import UserMapper from '../../../mappers/user.mapper';
import AuthMapper from '../../../mappers/auth.mapper';
import { UserRepositoryPort } from '../../../../domain/ports/secondary/user-repository.port';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(@InjectModel(User.name) private userModel: Model<UserEntity>) {}

  public async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return UserMapper.toDomains(users);
  }

  public async save(user: CreateUserDto): Promise<CreateUserDto> {
    let userCreated = new this.userModel(user);
    userCreated = await userCreated.save();
    return UserMapper.toCreateDomain(userCreated);
  }

  public async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    return UserMapper.toDomain(user);
  }

  public async delete(userId: string): Promise<User> {
    const userDeleted = await this.userModel.findByIdAndDelete(userId);
    return UserMapper.toDomain(userDeleted);
  }

  public async update(userId: string, user: User): Promise<User> {
    const userUpdated = await this.userModel.findByIdAndUpdate(userId, user);
    return UserMapper.toDomain(userUpdated);
  }

  public async findByEmail(email: string): Promise<Auth> {
    const user = await this.userModel.findOne({ email });
    return AuthMapper.toDomain(user);
  }
}
