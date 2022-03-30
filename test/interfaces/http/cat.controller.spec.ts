import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from '../../../src/interfaces/http/cat.controller';
import { CatService } from '../../../src/app/services/cat.service';

describe('CatController', () => {
  let catController: CatController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [CatService],
    }).compile();

    catController = app.get<CatController>(CatController);
  });

  describe('cats testing', () => {
    it('should return a list of famous cats', () => {
      expect(catController.getCats()).toEqual([
        { gender: 'Male', name: 'Tom' },
        { gender: 'Male', name: 'Garfield' },
        { gender: 'Male', name: 'Heathcliff' },
        { gender: 'Male', name: 'Simba' },
        { gender: 'Female', name: 'Nala' },
      ]);
    });

    it('print a message to the console', () => {
      expect(() => {
        catController.addCats({ name: 'Simba', gender: 'Male' });
      }).not.toThrow('error');
    });
  });
});
