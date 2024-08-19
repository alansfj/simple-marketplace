import { Router } from "express";

import { StoresService, ValidationService } from "../../../../domain/services";
import { StoresController } from "./stores.controller";

import {
  CateogoriesKyselyPostgresRepository,
  StoresKyselyPostgresRepository,
  UsersKyselyPostgresRepository,
} from "../../../repositories";

export class StoresRoutes {
  static get router(): Router {
    const router = Router();

    const storesRepository = new StoresKyselyPostgresRepository();
    const usersRepository = new UsersKyselyPostgresRepository();
    const categoriesRepository = new CateogoriesKyselyPostgresRepository();

    const validationService = new ValidationService(
      usersRepository,
      storesRepository,
      categoriesRepository
    );

    const service = new StoresService(storesRepository, validationService);

    const controller = new StoresController(service);

    router.post("/", controller.create);

    return router;
  }
}
