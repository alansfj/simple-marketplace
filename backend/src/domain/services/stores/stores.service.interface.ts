import { CreateStoreDto } from "../../dtos";
import { StoreEntity } from "../../entities";

export interface StoreServiceInterface {
  create(dto: CreateStoreDto): Promise<StoreEntity>;
}
