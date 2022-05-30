import { Module } from '@nestjs/common';
import { AuthModule } from '../infra/auth/auth.module';
import { MongoModule } from '../infra/adapters/repositories/mongodb/mongo.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongoModule, AuthModule, HttpModule],
})
export class InfraModule {}
