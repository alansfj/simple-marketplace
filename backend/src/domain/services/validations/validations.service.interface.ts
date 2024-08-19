import { CategoryEntity, StoreEntity, UserEntity } from "../../entities";

export interface ValidationServiceInterface {
  validateUser(userId: number): Promise<UserEntity>;
  validateStore(storeId: number): Promise<StoreEntity>;
  validateCategory(categoryId: number): Promise<CategoryEntity>;
}
