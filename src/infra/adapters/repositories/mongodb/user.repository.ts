import User from '../../../../domain/entities/user/user.dto';
import Auth from '../../../../domain/entities/auth/auth.dto';
import CreateUserDto from '../../../../domain/entities/user/create-user.dto';
import UpdateUserDto from '../../../../domain/entities/user/update-user.dto';
import FindUserDto from '../../../../domain/entities/user/find-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UserEntity } from './entities/user.entity';
import UserMapper from '../../../mappers/user.mapper';
import AuthMapper from '../../../mappers/auth.mapper';
import { UserRepositoryPort } from '../../../../domain/ports/secondary/user-repository.port';
import * as bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(@InjectModel(User.name) private userModel: Model<UserEntity>) {}

  public async findAll(): Promise<FindUserDto[]> {
    const users = await this.userModel.find();
    if (!users) {
      throw new NotFoundException();
    }
    return UserMapper.toFindDomains(users);
  }

  public async save(user: CreateUserDto): Promise<CreateUserDto> {
    let userCreated = new this.userModel(user);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userCreated.password, salt);
    if (await this.userModel.findOne({ email: userCreated.email })) {
      throw new ConflictException('User already exist!');
    }
    userCreated.password = hashedPassword;
    userCreated = await userCreated.save();

    return UserMapper.toCreateDomain(userCreated);
  }

  public async findById(userId: string): Promise<FindUserDto> {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException();
      }
      return UserMapper.toFindDomain(user);
    } else {
      throw new NotFoundException();
    }
  }

  public async delete(userId: string): Promise<User> {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const userDeleted = await this.userModel.findByIdAndDelete(userId);
      if (!userDeleted) {
        throw new NotFoundException();
      }
      return UserMapper.toDomain(userDeleted);
    } else {
      throw new NotFoundException();
    }
  }

  public async update(
    userId: string,
    user: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const userUpdated = await this.userModel.findByIdAndUpdate(userId, user);
      if (!userUpdated) {
        throw new NotFoundException();
      }
      return UserMapper.toUpdateDomain(userUpdated);
    } else {
      throw new NotFoundException();
    }
  }

  public async findByEmail(email: string): Promise<Auth> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid User!');
    }
    return AuthMapper.toDomain(user);
  }
}
