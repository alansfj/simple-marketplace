import { Request, Response } from "express";
import { ProductsServiceInterface } from "../../../../domain/services";
import { CreateProductDto } from "../../../../domain/dtos";

export class ProductsController {
  constructor(private readonly productsService: ProductsServiceInterface) {}

  create = (req: Request, res: Response) => {
    const [error, dto] = CreateProductDto.create({
      ...req.body,
      user_id: req.session.user?.id,
    });

    if (error)
      return res.status(error.statusCode || 500).json({ error: error.message });

    this.productsService
      .create(dto!)
      .then((product) => res.json(product))
      .catch((error) => {
        res.status(error.statusCode || 500).json({ error: error.message });
      });
  };
}
