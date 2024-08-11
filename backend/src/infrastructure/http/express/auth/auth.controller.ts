import { Request, Response } from "express";
import { AuthServiceInterface } from "../../../../domain/services";
import { LoginUserDto, RegisterUserDto } from "../../../../domain/dtos";

export class AuthController {
  constructor(private readonly service: AuthServiceInterface) {}

  register = (req: Request, res: Response) => {
    const [error, dto] = RegisterUserDto.create(req.body);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    this.service
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

    this.service
      .login(dto!)
      .then((user) => res.json(user))
      .catch((error) => {
        // console.log(error);
        res.status(error.statusCode || 500).json({ error: error.message });
      });
  };
}
