import { Router } from "express";

import { ProductsService } from "../../../../domain/services";
import { ProductsController } from "./products.controller";
import { ProductsKyselyPostgresRepository } from "../../../repositories";

export class ProductsRoutes {
  static get router(): Router {
    const router = Router();

    const repository = new ProductsKyselyPostgresRepository();
    const service = new ProductsService(repository);
    const controller = new ProductsController(service);

    router.post("/", controller.create);

    return router;
  }
}
