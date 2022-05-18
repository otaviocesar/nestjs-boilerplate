import { Module } from '@nestjs/common';
import { UserModule } from '../domain/entities/user/user.module';
import { RecipientModule } from './entities/recipient/recipient.module';

@Module({
  imports: [UserModule, RecipientModule],
})
export class DomainModule {}
