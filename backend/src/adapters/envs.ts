import "dotenv/config";
import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  JWT_SEED: env.get("JWT_SEED").required().asString(),
};
