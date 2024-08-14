import { CreateStoreDto } from "../../../domain/dtos";
import { StoreEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { StoreRepositoryInterface } from "../../../domain/repositories";
import { kysely } from "../../database";

export class StoresKyselyPostgresRepository
  implements StoreRepositoryInterface
{
  async create(dto: CreateStoreDto): Promise<StoreEntity> {
    try {
      const { name, user_id, categories } = dto;

      const storeCateogoriesObj = await kysely
        .transaction()
        .execute(async (trx) => {
          await trx
            .selectFrom("users")
            .where("id", "=", user_id)
            .executeTakeFirstOrThrow(() =>
              CustomError.badRequest("user not exists")
            );

          const newStore = await trx
            .insertInto("stores")
            .values({
              name: name,
              user_id: user_id,
            })
            .returningAll()
            .executeTakeFirstOrThrow(() =>
              CustomError.internalServer(
                "something went wrong at creating store"
              )
            );

          const storeCategories = await Promise.all(
            categories.map(async (category_id) => {
              const category = await trx
                .selectFrom("categories")
                .selectAll()
                .where("id", "=", category_id)
                .executeTakeFirstOrThrow(() =>
                  CustomError.badRequest(
                    `category with id ${category_id} not exists`
                  )
                );

              await trx
                .insertInto("store_categories")
                .values({
                  store_id: newStore.id,
                  category_id: category.id,
                })
                .returningAll()
                .executeTakeFirstOrThrow(() =>
                  CustomError.badRequest(
                    "something went wrong at inserting store categories"
                  )
                );

              return category;
            })
          );

          return { store: newStore, categories: storeCategories };
        });

      return StoreEntity.fromObject({
        ...storeCateogoriesObj.store,
        categories: storeCateogoriesObj.categories,
      });
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
}
