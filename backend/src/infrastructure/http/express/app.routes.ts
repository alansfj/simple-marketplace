import { Router } from "express";

import { AuthRoutes } from "./auth";
import { StoresRoutes } from "./stores";
import { AuthMiddleware } from "./middlewares";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);

    router.use(
      "/api/stores",
      [AuthMiddleware.valiadteJWT],
      StoresRoutes.router
    );

    return router;
  }
}
