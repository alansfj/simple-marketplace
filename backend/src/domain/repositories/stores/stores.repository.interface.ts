import { CreateStoreDto } from "../../dtos";
import { StoreEntity } from "../../entities";

export interface StoreRepositoryInterface {
  create(dto: CreateStoreDto): Promise<StoreEntity>;
}
