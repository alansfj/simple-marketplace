import { CreateProductDto } from "../../../domain/dtos";
import { ProductEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { ProductsRepositoryInterface } from "../../../domain/repositories";
import { kysely } from "../../database";

export class ProductsKyselyPostgresRepository
  implements ProductsRepositoryInterface
{
  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = await kysely
      .insertInto("products")
      .values({ ...dto })
      .returningAll()
      .executeTakeFirstOrThrow(() =>
        CustomError.badRequest("something went wrong at creating product")
      );

    return ProductEntity.fromObject(newProduct);
  }
}
