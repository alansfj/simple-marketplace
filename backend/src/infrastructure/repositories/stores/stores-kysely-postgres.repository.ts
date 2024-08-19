import { CreateStoreDto } from "../../../domain/dtos";
import { CategoryEntity, StoreEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { StoreRepositoryInterface } from "../../../domain/repositories";
import { kysely } from "../../database";

export class StoresKyselyPostgresRepository
  implements StoreRepositoryInterface
{
  async createStore(
    dto: CreateStoreDto,
    categories: CategoryEntity[]
  ): Promise<StoreEntity> {
    return await kysely.transaction().execute(async (trx) => {
      const newStore = await trx
        .insertInto("stores")
        .values({
          name: dto.name,
          user_id: dto.user_id,
        })
        .returningAll()
        .executeTakeFirstOrThrow(() =>
          CustomError.internalServer("Something went wrong at creating store")
        );

      await Promise.all(
        categories.map(async (category) => {
          await trx
            .insertInto("store_categories")
            .values({
              store_id: newStore.id,
              category_id: category.id,
            })
            .executeTakeFirstOrThrow(() =>
              CustomError.internalServer(
                "Something went wrong at inserting store categories"
              )
            );
        })
      );

      return StoreEntity.fromObject({ ...newStore, categories });
    });
  }
}
