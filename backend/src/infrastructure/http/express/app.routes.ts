import { Router } from "express";

import { AuthRoutes } from "./auth";
import { StoresRoutes } from "./stores";
import { AuthMiddleware } from "./middlewares";
import { ProductsRoutes } from "./products";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);

    router.use(
      "/api/stores",
      [AuthMiddleware.valiadteJWT],
      StoresRoutes.router
    );

    router.use(
      "/api/products",
      [AuthMiddleware.valiadteJWT],
      ProductsRoutes.router
    );

    return router;
  }
}
