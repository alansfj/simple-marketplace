import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities";
import { ProductsRepositoryInterface } from "../../repositories";
import { ValidationServiceInterface } from "../validations";
import { ProductsServiceInterface } from "./products.service.interface";

export class ProductsService implements ProductsServiceInterface {
  constructor(
    private readonly productsRepository: ProductsRepositoryInterface,
    private readonly validationsService: ValidationServiceInterface
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    await Promise.all([
      this.validationsService.validateUser(dto.user_id),
      this.validationsService.validateStore(dto.store_id),
      this.validationsService.validateCategory(dto.category_id),
    ]);

    return await this.productsRepository.create(dto);
  }
}
