import { Request, Response } from "express";
import { CreateStoreDto } from "../../../../domain/dtos";
import { StoresService } from "../../../../domain/services";

export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  create = (req: Request, res: Response) => {
    const [error, dto] = CreateStoreDto.create(req.body);

    if (error)
      return res.status(error.statusCode).json({ error: error.message });

    this.storesService
      .create(dto!)
      .then((store) => res.json(store))
      .catch((error) => {
        res.status(error.statusCode || 500).json({ error: error.message });
      });
  };
}
