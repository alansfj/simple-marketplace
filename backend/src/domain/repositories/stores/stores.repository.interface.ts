import { CreateStoreDto } from "../../dtos";
import { CategoryEntity, StoreEntity } from "../../entities";

export interface StoreRepositoryInterface {
  createStore(
    dto: CreateStoreDto,
    categories: CategoryEntity[]
  ): Promise<StoreEntity>;
}
