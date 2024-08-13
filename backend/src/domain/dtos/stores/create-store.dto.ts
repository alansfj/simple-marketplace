import { CustomError } from "../../errors";

export class CreateStoreDto {
  private constructor(
    public readonly name: string,
    public readonly user_id: number
  ) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, CreateStoreDto?] {
    const { name, user_id } = object;

    if (!name) return [CustomError.badRequest("name property is required")];

    if (typeof name !== "string")
      return [CustomError.badRequest("name property must be a string")];

    if (!name.trim())
      return [CustomError.badRequest("name property is required")];

    if (!user_id)
      return [CustomError.badRequest("user_id property is required")];

    if (isNaN(Number(user_id)))
      return [CustomError.badRequest("user_id property must be a number")];

    return [undefined, new CreateStoreDto(name, Number(user_id))];
  }
}
