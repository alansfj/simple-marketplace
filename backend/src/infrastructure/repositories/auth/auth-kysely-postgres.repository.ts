import { RegisterUserDto } from "../../../domain/dtos";
import { UserEntity } from "../../../domain/entities";
import { AuthRepositoryInterface } from "../../../domain/repositories";

import { kysely } from "../../database";

export class AuthKyselyPostgresRepository implements AuthRepositoryInterface {
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await kysely
      .selectFrom("users")
      .selectAll()
      .where("email", "=", `${email}`)
      .executeTakeFirst();

    return user ? UserEntity.fromObject(user) : null;
  }

  async registerUser(dto: RegisterUserDto): Promise<UserEntity | null> {
    const newUser = await kysely
      .insertInto("users")
      .values({
        name: dto.name,
        email: dto.email,
        password: dto.password,
      })
      .returningAll()
      .executeTakeFirst();

    return newUser ? UserEntity.fromObject(newUser) : null;
  }

  async logout() {}
}
