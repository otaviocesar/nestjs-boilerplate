import { Module } from '@nestjs/common';
import { CatController } from '../interfaces/http/cat.controller';
import { CatService } from './services/cat.service';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
