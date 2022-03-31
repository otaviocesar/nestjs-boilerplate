import { Module } from '@nestjs/common';
import { UserModule } from '../domain/entities/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
