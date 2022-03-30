import { Controller, Get, Post, Body } from '@nestjs/common';

import { CatService } from '../../app/services/cat.service';

import CatDto from '../../domain/entities/cat.dto';

@Controller()
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('/cats')
  public getCats(): CatDto[] {
    return this.catService.getCats();
  }

  @Post('/cats')
  public addCats(@Body() catDto: CatDto): void {
    this.catService.addCat(catDto);
  }
}
