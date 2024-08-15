import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities";
import { ProductsRepositoryInterface } from "../../repositories";
import { ProductsServiceInterface } from "./products.service.interface";

export class ProductsService implements ProductsServiceInterface {
  constructor(
    private readonly productsRepository: ProductsRepositoryInterface
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    return await this.productsRepository.create(dto);
  }
}
