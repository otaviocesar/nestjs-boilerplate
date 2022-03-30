import CatModel from './model/cat.model';
import CatDto from './cat.dto';

/**
 * The APPLICATION layer is using the format <object>Dto to represent application data
 * The DOMAIN layer is using the format <object>Model to represent model data
 * The INFRASTRUCTURE layer is using the format <object>Entity to represent repository
 */
export default class AppCatMapper {
  public static toDomain(catDto: CatDto): CatModel {
    return new CatModel(catDto.name, catDto.gender);
  }

  public static toDto(catDomain: CatModel): CatDto {
    return new CatDto(catDomain.name, catDomain.gender);
  }
}
