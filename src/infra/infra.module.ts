import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../infra/auth/auth.module';
import { MongoModule } from '../infra/adapters/repositories/mongodb/mongo.module';

@Module({
  imports: [MongoModule, AuthModule, HttpModule],
})
export class InfraModule {}
