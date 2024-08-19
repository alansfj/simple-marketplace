import { CreateStoreDto } from "../../dtos";
import { CategoryEntity, StoreEntity } from "../../entities";

export interface StoreRepositoryInterface {
  findById(id: number): Promise<StoreEntity | null>;

  createStore(
    dto: CreateStoreDto,
    categories: CategoryEntity[]
  ): Promise<StoreEntity>;
}
