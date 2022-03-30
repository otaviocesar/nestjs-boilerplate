import CatModel from '../../entities/model/cat.model';

/**
 * Secondary ports represent the interface between DOMAIN -> INFRASTRUCTURE
 */
export default interface CatRepository {
  getAll(): CatModel[];
}
