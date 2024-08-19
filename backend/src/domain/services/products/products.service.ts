import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities";
import { CustomError } from "../../errors";
import {
  CategoriesRepositoryInterface,
  ProductsRepositoryInterface,
  StoreRepositoryInterface,
  UsersRepositoryInterface,
} from "../../repositories";
import { ProductsServiceInterface } from "./products.service.interface";

export class ProductsService implements ProductsServiceInterface {
  constructor(
    private readonly productsRepository: ProductsRepositoryInterface,
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly storeRepository: StoreRepositoryInterface,
    private readonly categoryRepository: CategoriesRepositoryInterface
  ) {}

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const user = await this.usersRepository.findUserById(dto.user_id);

    if (!user) {
      throw CustomError.badRequest("user not exists");
    }

    const store = await this.storeRepository.findById(dto.store_id);

    if (!store) {
      throw CustomError.badRequest("store not exists");
    }

    const category = await this.categoryRepository.findById(dto.category_id);

    if (!category) {
      throw CustomError.badRequest("category not exists");
    }

    return await this.productsRepository.create(dto);
  }
}
