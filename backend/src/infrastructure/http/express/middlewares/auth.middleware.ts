import { NextFunction, Request, Response } from "express";

import { JWT } from "../../../../adapters";

// Necesario para poder asignar el objeto req.session.user
declare module "express-serve-static-core" {
  interface Request {
    session: {
      user: {
        id: number;
        email: string;
        name: string;
      } | null;
    };
  }
}

export class AuthMiddleware {
  static async valiadteJWT(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    let accessTokenPayload = null;
    let refreshTokenPayload = null;

    req.session = { user: null };

    try {
      accessTokenPayload = await JWT.validateToken<{
        id: number;
        email: string;
        name: string;
      }>(accessToken);

      if (accessTokenPayload) {
        req.session.user = accessTokenPayload;

        // console.log("access token ok");

        next();
        return;
      }

      // console.log("access token expired, creatting a new access token");

      refreshTokenPayload = await JWT.validateToken<{
        id: number;
        email: string;
        name: string;
      }>(refreshToken);

      if (!refreshTokenPayload) {
        // console.log("refresh token expired");

        return res
          .clearCookie("access_token")
          .clearCookie("refresh_token")
          .status(401)
          .json({ error: "unauthorized" });
      }

      const newAccessToken = await JWT.generateToken(
        {
          id: refreshTokenPayload.id,
          email: refreshTokenPayload.email,
          name: refreshTokenPayload.name,
        },
        "15m"
      );

      if (!newAccessToken) {
        return res
          .status(500)
          .json({ error: "error creating new access token" });
      }

      res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 15,
      });

      // console.log("refresh token ok, new access token created");

      req.session.user = refreshTokenPayload;
      next();
      return;
    } catch (error: any) {
      console.log(error);
      req.session.user = null;
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
}
