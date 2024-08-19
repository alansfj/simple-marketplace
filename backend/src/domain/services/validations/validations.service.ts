import { ValidationServiceInterface } from "./validations.service.interface";
import { CustomError } from "../../errors";
import {
  CategoriesRepositoryInterface,
  StoreRepositoryInterface,
  UsersRepositoryInterface,
} from "../../repositories";
import { CategoryEntity, StoreEntity, UserEntity } from "../../entities";

export class ValidationService implements ValidationServiceInterface {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly storeRepository: StoreRepositoryInterface,
    private readonly categoryRepository: CategoriesRepositoryInterface
  ) {}

  async validateUser(userId: number): Promise<UserEntity> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) throw CustomError.badRequest("user not found");
    return user;
  }

  async validateStore(storeId: number): Promise<StoreEntity> {
    const store = await this.storeRepository.findById(storeId);
    if (!store) throw CustomError.badRequest("store not found");
    return store;
  }

  async validateCategory(categoryId: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findById(categoryId);
    if (!category) throw CustomError.badRequest("category not found");
    return category;
  }
}
