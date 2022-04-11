import User from '../../../../domain/entities/user/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from './entities/user.entity';
import UserMapper from '../../../mappers/user.mapper';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserEntity>) {}

  public async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return UserMapper.toDomains(users);
  }

  public async save(user: User): Promise<User> {
    let userCreated = new this.userModel(user);
    userCreated = await userCreated.save();
    return UserMapper.toDomain(userCreated);
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

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return UserMapper.toDomain(user);
  }
}
