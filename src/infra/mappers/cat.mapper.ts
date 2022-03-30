import CatModel from '../../domain/entities/cat/model/cat.model';
import CatEntity from '../adapters/repositories/inmemory-repository/inmemory.cat.entity';

export default class InfraCatMapper {
  public static toDomain(catEntity: CatEntity): CatModel {
    return new CatModel(catEntity.name, catEntity.gender);
  }
}
