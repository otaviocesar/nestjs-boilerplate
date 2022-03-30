import { Test, TestingModule } from '@nestjs/testing';
import { CatService } from '../../../src/app/services/cat.service';
import CatDto from '../../../src/domain/entities/cat.dto';

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatService],
    }).compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of cats', () => {
    expect(service.getCats()).toEqual([
      {
        name: 'Tom',
        gender: 'Male',
      },
      {
        name: 'Garfield',
        gender: 'Male',
      },
      {
        name: 'Heathcliff',
        gender: 'Male',
      },
      {
        name: 'Simba',
        gender: 'Male',
      },
      {
        name: 'Nala',
        gender: 'Female',
      },
    ]);
  });

  it('should not throw exception when adding a new cat', () => {
    const newCat = new CatDto('Test Cat', 'Female');
    expect(() => service.addCat(newCat)).not.toThrow();
  });
});
