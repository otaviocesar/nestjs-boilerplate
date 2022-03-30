import CatMapper from '../../../mappers/cat.mapper';
import CatModel from '../../../../domain/entities/cat/model/cat.model';
import CatRepository from '../../../ports/secondary/cat.repository';
import CatEntity from './inmemory.cat.entity';

export default class InMemoryCatRepository implements CatRepository {
  private cats: CatEntity[];

  constructor() {
    const createdTimestamp = Date();
    this.cats = [
      {
        name: 'Tom',
        gender: 'Male',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Garfield',
        gender: 'Male',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Heathcliff',
        gender: 'Male',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Simba',
        gender: 'Male',
        cratedAt: createdTimestamp,
      },
      {
        name: 'Nala',
        gender: 'Female',
        cratedAt: createdTimestamp,
      },
    ];
  }

  public getAll(): CatModel[] {
    return this.cats.map((catEntity) => CatMapper.toDomain(catEntity));
  }
}
