import { regularExps } from "../../../utils";
import { CustomError } from "../../errors";

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly confirmPassword: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [CustomError?, RegisterUserDto?] {
    const { name, email, password, confirmPassword } = object;

    if (!name) return [CustomError.badRequest("name property is required")];

    if (typeof name !== "string")
      return [CustomError.badRequest("name property must be string")];

    if (!name.trim())
      return [CustomError.badRequest("name property is required")];

    if (!email) return [CustomError.badRequest("email property is required")];

    if (typeof email !== "string")
      return [CustomError.badRequest("email property must be a string")];

    if (!email.trim())
      return [CustomError.badRequest("email property is required")];

    if (!regularExps.email.test(email))
      return [CustomError.badRequest("email not valid")];

    if (!password)
      return [CustomError.badRequest("password property is required")];

    if (typeof password !== "string")
      return [CustomError.badRequest("password property must be a string")];

    if (!password.trim())
      return [CustomError.badRequest("password property is required")];

    if (!regularExps.password.test(password))
      return [CustomError.badRequest("password too short")];

    if (!confirmPassword)
      return [CustomError.badRequest("confirmPassword property is required")];

    if (typeof confirmPassword !== "string")
      return [
        CustomError.badRequest("confirmPassword property must be a string"),
      ];

    if (!confirmPassword.trim())
      return [CustomError.badRequest("confirmPassword property is required")];

    if (password !== confirmPassword)
      return [CustomError.badRequest("passwords are not the same")];

    return [
      undefined,
      new RegisterUserDto(name, email, password, confirmPassword),
    ];
  }
}
