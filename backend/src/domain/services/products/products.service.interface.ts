import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities";

export interface ProductsServiceInterface {
  create(dto: CreateProductDto): Promise<ProductEntity>;
}
