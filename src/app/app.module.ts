import { Module } from '@nestjs/common';
import { UserModule } from '../domain/entities/user/user.module';
import { AuthModule } from '../domain/entities/auth/auth.module';

import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from '../infra/environments';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), UserModule, AuthModule],
})
export class AppModule {}
