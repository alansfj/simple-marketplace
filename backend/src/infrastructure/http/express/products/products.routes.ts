import { Router } from "express";

import { ProductsService } from "../../../../domain/services";
import { ProductsController } from "./products.controller";
import {
  CateogoriesKyselyPostgresRepository,
  ProductsKyselyPostgresRepository,
  StoresKyselyPostgresRepository,
  UsersKyselyPostgresRepository,
} from "../../../repositories";

export class ProductsRoutes {
  static get router(): Router {
    const router = Router();

    const productRepository = new ProductsKyselyPostgresRepository();
    const userRepository = new UsersKyselyPostgresRepository();
    const storeRepository = new StoresKyselyPostgresRepository();
    const categoryRepository = new CateogoriesKyselyPostgresRepository();

    const service = new ProductsService(
      productRepository,
      userRepository,
      storeRepository,
      categoryRepository
    );

    const controller = new ProductsController(service);

    router.post("/", controller.create);

    return router;
  }
}
