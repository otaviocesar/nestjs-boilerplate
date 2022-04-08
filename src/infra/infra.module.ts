import { Module } from '@nestjs/common';
import { AuthModule } from '../infra/auth/auth.module';
import { MongoModule } from '../infra/adapters/repositories/mongodb/mongo.module';

@Module({
  imports: [MongoModule, AuthModule],
})
export class InfraModule {}
