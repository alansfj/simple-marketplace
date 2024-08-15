import { CustomError } from "../../errors";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly category_id: number,
    public readonly store_id: number,
    public readonly user_id: number,
    public readonly description: string,
    public readonly price: number,
    public readonly quantity: number,
    public readonly upc: string,
    public readonly is_available: boolean
  ) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, CreateProductDto?] {
    const {
      name,
      category_id,
      store_id,
      user_id,
      description,
      price,
      quantity,
      upc = "",
      is_available,
    } = object;

    if (!name) return [CustomError.badRequest("name property is required")];

    if (typeof name !== "string")
      return [CustomError.badRequest("name property must be a string")];

    if (!name.trim())
      return [CustomError.badRequest("name property is required")];

    if (!category_id)
      return [CustomError.badRequest("category_id property is required")];

    if (isNaN(Number(category_id)))
      return [CustomError.badRequest("category_id property must be a number")];

    if (!store_id)
      return [CustomError.badRequest("store_id property is required")];

    if (isNaN(Number(store_id)))
      return [CustomError.badRequest("store_id property must be a number")];

    if (!user_id)
      return [CustomError.badRequest("user_id property is required")];

    if (isNaN(Number(user_id)))
      return [CustomError.badRequest("user_id property must be a number")];

    if (!description)
      return [CustomError.badRequest("description property is required")];

    if (typeof description !== "string")
      return [CustomError.badRequest("description property must be a string")];

    if (!description.trim())
      return [CustomError.badRequest("description property is required")];

    if (!price) return [CustomError.badRequest("price property is required")];

    if (isNaN(Number(price)))
      return [CustomError.badRequest("price property must be a number")];

    if (Number(price) <= 0)
      return [
        CustomError.badRequest("price property must be greater than zero"),
      ];

    if (!quantity)
      return [CustomError.badRequest("quantity property is required")];

    if (isNaN(Number(quantity)))
      return [CustomError.badRequest("quantity property must be a number")];

    if (Number(quantity) <= 0)
      return [
        CustomError.badRequest("quantity property must be greater than zero"),
      ];

    if (upc) {
      if (typeof upc !== "string") {
        return [CustomError.badRequest("upc property must be a string")];
      }

      if (!upc.trim()) {
        return [CustomError.badRequest("upc property cannot be blank spaces")];
      }
    }

    if (is_available === undefined)
      return [CustomError.badRequest("is_available property is required")];

    if (typeof is_available !== "boolean")
      return [CustomError.badRequest("is_available property must be boolean")];

    return [
      undefined,
      new CreateProductDto(
        name,
        Number(category_id),
        Number(store_id),
        Number(user_id),
        description,
        Number(price),
        Number(quantity),
        upc,
        is_available
      ),
    ];
  }
}
