import CatModel from './model/cat.model';
import CatServiceApi from '../../../infra/ports/primary/cat.service.api';
import CatRepository from '../../../infra/ports/secondary/cat.repository';
import Notifier from '../../../infra/ports/secondary/notifier';

/**
 * Pure DOMAIN logic
 * no dependencies on INFRASTRUCTURE or IDE
 */
export default class DomainCatService implements CatServiceApi {
  constructor(
    private catRepository: CatRepository,
    private customerNotifier: Notifier,
  ) {}

  public getAllCats(): CatModel[] {
    return this.catRepository.getAll();
  }

  public addCat(cat: CatModel): void {
    this.customerNotifier.notify(`I am adding a new cat ${cat.name}`);
  }
}
