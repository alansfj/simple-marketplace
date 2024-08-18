import { JWT } from "../../../adapters";
import { CustomError } from "../../errors";
import { TokenServiceInterface } from "./token.service.interface";

export class TokenService implements TokenServiceInterface {
  async generateToken(
    payload: any,
    duration: string | number
  ): Promise<string> {
    const token = await JWT.generateToken(payload, duration);

    if (!token) throw CustomError.internalServer("error creating jwt");

    return token;
  }

  async validateToken<T>(token: string): Promise<T> {
    const payload = await JWT.validateToken<T>(token);

    if (!payload) throw CustomError.badRequest("error validating token");

    return payload as T;
  }
}
