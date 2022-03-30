import CatModel from '../../entities/model/cat.model';

/**
 * Primary ports represent the interface between APPLICATION -> DOMAIN
 */
export default interface CatServiceApi {
  getAllCats(): CatModel[];
  addCat(cat: CatModel): void;
}
