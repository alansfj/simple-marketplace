import { bcrypt, JWT } from "../../../adapters";
import { RegisterUserDto, LoginUserDto } from "../../../domain/dtos";
import { UserEntity } from "../../../domain/entities";
import { CustomError } from "../../../domain/errors";
import { AuthRepositoryInterface } from "../../../domain/repositories";
import { kysely } from "../../database";

export class AuthKyselyPostgresRepository implements AuthRepositoryInterface {
  async register(dto: RegisterUserDto): Promise<UserEntity> {
    try {
      const { name, email, password } = dto;

      const userId = await kysely
        .selectFrom("users")
        .select("id")
        .where("email", "=", `${email}`)
        .executeTakeFirst();

      if (userId) throw CustomError.badRequest("user already exists");

      const hashedPassword = bcrypt.hashPassword(password);

      const newUser = await kysely
        .insertInto("users")
        .values({
          name,
          email,
          password: hashedPassword,
        })
        .returningAll()
        .executeTakeFirst();

      if (!newUser)
        throw CustomError.internalServer(
          "something went wrong at creating user"
        );

      return UserEntity.fromObjectPublic(newUser);
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginUserDto): Promise<UserEntity> {
    try {
      const { email, password } = dto;

      const user = await kysely
        .selectFrom("users")
        .selectAll()
        .where("email", "=", `${email}`)
        .executeTakeFirst();

      if (!user) throw CustomError.badRequest("user email or password wrong");

      const isCorrectPassword = bcrypt.comparePasswords(
        password,
        user.password
      );

      if (!isCorrectPassword)
        throw CustomError.badRequest(`user email or password wrong`);

      const token = await JWT.generateToken({ id: user.id, email: user.email });

      if (!token) throw CustomError.internalServer("error creating jwt");

      return UserEntity.fromObjectPublic(user);
    } catch (error) {
      throw error;
    }
  }
}
