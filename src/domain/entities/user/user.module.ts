import { Module } from '@nestjs/common';
import { UserController } from '../../../interfaces/http/user.controller';
import { UserService } from '../../../app/services/user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
