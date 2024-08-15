import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities";

export interface ProductsRepositoryInterface {
  create(dto: CreateProductDto): Promise<ProductEntity>;
}
