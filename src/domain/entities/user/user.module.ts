import { Module } from '@nestjs/common';
import { UserController } from '../../../interfaces/http/user.controller';
import { UserService } from '../../../app/services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../infra/adapters/repositories/mongodb/schemas/user.schema';
import { UserRepository } from '../../../infra/adapters/repositories/mongodb/user.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserServicePort',
      useClass: UserService,
    },
    {
      provide: 'UserRepositoryPort',
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: 'UserServicePort',
      useClass: UserService,
    },
  ],
})
export class UserModule {}
