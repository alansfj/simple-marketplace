import { Router } from "express";

import { StoresService } from "../../../../domain/services";
import { StoresController } from "./stores.controller";
import { StoresKyselyPostgresRepository } from "../../../repositories";

export class StoresRoutes {
  static get router(): Router {
    const router = Router();

    const repository = new StoresKyselyPostgresRepository();
    const service = new StoresService(repository);
    const controller = new StoresController(service);

    router.post("/", controller.create);

    return router;
  }
}
