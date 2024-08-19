import { CategoryEntity } from "../../entities";

export interface CategoriesRepositoryInterface {
  findById(id: number): Promise<CategoryEntity | null>;
}
