import { CategoryEntity } from "../../../domain/entities";
import { CategoriesRepositoryInterface } from "../../../domain/repositories";

import { kysely } from "../../database";

export class CateogoriesKyselyPostgresRepository
  implements CategoriesRepositoryInterface
{
  async findById(id: number): Promise<CategoryEntity | null> {
    const category = await kysely
      .selectFrom("categories")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return category ? CategoryEntity.fromObject(category) : null;
  }
}
