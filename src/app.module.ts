import { Module } from '@nestjs/common';
import { CatModule } from './app/cat.module';

@Module({
  imports: [CatModule],
})
export class AppModule {}
