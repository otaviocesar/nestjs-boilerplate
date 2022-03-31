import { Module } from '@nestjs/common';
import { UserController } from '../../../interfaces/http/user.controller';
import { UserService } from '../../../app/services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
