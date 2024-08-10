import express from "express";
import { envs } from "../../../adapters/envs";

export class Server {
  static start() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(envs.PORT, () => {
      console.log(`Server running on port ${envs.PORT}`);
    });
  }
}
