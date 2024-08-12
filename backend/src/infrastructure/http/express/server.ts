import express from "express";
import cookieParser from "cookie-parser";

import { envs } from "../../../adapters";
import { AppRoutes } from "./app.routes";

export class Server {
  static start() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use(AppRoutes.routes);

    app.listen(envs.PORT, () => {
      console.log(`Server running on port ${envs.PORT}`);
    });
  }
}
