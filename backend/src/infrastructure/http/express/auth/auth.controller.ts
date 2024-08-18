import { Request, Response } from "express";

import { AuthServiceInterface } from "../../../../domain/services";
import { LoginUserDto, RegisterUserDto } from "../../../../domain/dtos";

export class AuthController {
  constructor(private readonly authService: AuthServiceInterface) {}

  register = (req: Request, res: Response) => {
    const [error, dto] = RegisterUserDto.create(req.body);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    this.authService
      .register(dto!)
      .then((user) => res.json(user))
      .catch((error) => {
        // console.log(error);
        res.status(error.statusCode || 500).json({ error: error.message });
      });
  };

  login = (req: Request, res: Response) => {
    const [error, dto] = LoginUserDto.create(req.body);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    this.authService
      .login(dto!)
      .then(({ user, accessToken, refreshToken }) =>
        res
          .cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 15,
          })
          .cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24,
          })
          .json(user)
      )
      .catch((error) => {
        // console.log(error);
        res.status(error.statusCode || 500).json({ error: error.message });
      });
  };

  logout = (req: Request, res: Response) => {
    res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .json({ message: "logout successful" });
  };
}
