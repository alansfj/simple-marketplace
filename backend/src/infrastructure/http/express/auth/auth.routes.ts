import { Request, Response, Router } from "express";

import { AuthService, TokenService } from "../../../../domain/services";

import { UsersKyselyPostgresRepository } from "../../../repositories";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "../middlewares";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const usersRepository = new UsersKyselyPostgresRepository();
    const tokenService = new TokenService();
    const authService = new AuthService(usersRepository, tokenService);
    const controller = new AuthController(authService);

    router.post("/register", controller.register);
    router.post("/login", controller.login);
    router.post("/logout", [AuthMiddleware.valiadteJWT], controller.logout);

    router.get(
      "/private",
      [AuthMiddleware.valiadteJWT],
      (req: Request, res: Response) => {
        res.json({ message: "private content test" });
      }
    );

    return router;
  }
}
