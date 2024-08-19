import { CreateStoreDto } from "../../dtos";
import { StoreEntity } from "../../entities";
import { StoreRepositoryInterface } from "../../repositories";
import { ValidationServiceInterface } from "../validations";
import { StoreServiceInterface } from "./stores.service.interface";

export class StoresService implements StoreServiceInterface {
  constructor(
    private readonly storesRepository: StoreRepositoryInterface,
    private readonly validationsService: ValidationServiceInterface
  ) {}

  async create(dto: CreateStoreDto): Promise<StoreEntity> {
    await this.validationsService.validateUser(dto.user_id);

    const categories = await Promise.all(
      dto.categories.map(async (category_id) => {
        return this.validationsService.validateCategory(category_id);
      })
    );

    return await this.storesRepository.createStore(dto, categories);
  }
}
