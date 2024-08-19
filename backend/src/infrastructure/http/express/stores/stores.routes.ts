import { Router } from "express";

import { StoresService } from "../../../../domain/services";
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

    const service = new StoresService(
      storesRepository,
      usersRepository,
      categoriesRepository
    );

    const controller = new StoresController(service);

    router.post("/", controller.create);

    return router;
  }
}
