import { Module } from '@nestjs/common';
import { CatModule } from '../domain/entities/cat/cat.module';

@Module({
  imports: [CatModule],
})
export class AppModule {}
