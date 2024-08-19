import { CreateStoreDto } from "../../dtos";
import { StoreEntity } from "../../entities";
import { CustomError } from "../../errors";
import {
  CategoriesRepositoryInterface,
  StoreRepositoryInterface,
  UsersRepositoryInterface,
} from "../../repositories";
import { StoreServiceInterface } from "./stores.service.interface";

export class StoresService implements StoreServiceInterface {
  constructor(
    private readonly storesRepository: StoreRepositoryInterface,
    private readonly usersRespository: UsersRepositoryInterface,
    private readonly categoriesRepository: CategoriesRepositoryInterface
  ) {}

  async create(dto: CreateStoreDto): Promise<StoreEntity> {
    const user = await this.usersRespository.findUserById(dto.user_id);

    if (!user) {
      throw CustomError.badRequest("user not exists");
    }

    const categories = await Promise.all(
      dto.categories.map(async (category_id) => {
        const category = await this.categoriesRepository.findById(category_id);

        if (!category) {
          throw CustomError.badRequest(
            `Category with id ${category_id} does not exist`
          );
        }

        return category;
      })
    );

    return await this.storesRepository.createStore(dto, categories);
  }
}
