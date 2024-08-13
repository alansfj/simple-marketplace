import { CreateStoreDto } from "../../dtos";
import { StoreEntity } from "../../entities";
import { StoreRepositoryInterface } from "../../repositories";
import { StoreServiceInterface } from "./stores.service.interface";

export class StoresService implements StoreServiceInterface {
  constructor(private readonly storesRepository: StoreRepositoryInterface) {}

  async create(dto: CreateStoreDto): Promise<StoreEntity> {
    return await this.storesRepository.create(dto);
  }
}
