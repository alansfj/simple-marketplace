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
      const { name, user_id } = dto;

      // TODO:
      // Los ids de las categorias de la tienda deben llegar a este punto
      // y ser insertadas en la tabla de stores_category

      const user = await kysely
        .selectFrom("users")
        .select("id")
        .where("id", "=", user_id)
        .executeTakeFirst();

      if (!user) throw CustomError.badRequest("user not exists");

      const newStore = await kysely
        .insertInto("stores")
        .values({
          name,
          user_id,
        })
        .returningAll()
        .executeTakeFirst();

      if (!newStore)
        throw CustomError.internalServer(
          "something went wrong at creating store"
        );

      return StoreEntity.fromObject(newStore);
    } catch (error) {
      throw error;
    }
  }
}
