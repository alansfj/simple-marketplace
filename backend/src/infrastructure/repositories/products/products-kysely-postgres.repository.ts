import { CreateProductDto } from "../../../domain/dtos";
import { ProductEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { ProductsRepositoryInterface } from "../../../domain/repositories";
import { kysely } from "../../database";

export class ProductsKyselyPostgresRepository
  implements ProductsRepositoryInterface
{
  async create(dto: CreateProductDto): Promise<ProductEntity> {
    try {
      const newProduct = await kysely.transaction().execute(async (trx) => {
        await Promise.all([
          trx
            .selectFrom("users")
            .where("id", "=", dto.user_id)
            .executeTakeFirstOrThrow(() =>
              CustomError.badRequest("user not exists")
            ),
          trx
            .selectFrom("stores")
            .where("id", "=", dto.store_id)
            .executeTakeFirstOrThrow(() =>
              CustomError.badRequest("store not exists")
            ),
          trx
            .selectFrom("categories")
            .where("id", "=", dto.category_id)
            .executeTakeFirstOrThrow(() =>
              CustomError.badRequest("category not exists")
            ),
        ]);

        return await trx
          .insertInto("products")
          .values({ ...dto })
          .returningAll()
          .executeTakeFirstOrThrow(() =>
            CustomError.badRequest("something went wrong at creating product")
          );
      });

      return ProductEntity.fromObject(newProduct);
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
}
