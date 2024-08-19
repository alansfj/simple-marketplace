import { RegisterUserDto } from "../../../domain/dtos";
import { UserEntity } from "../../../domain/entities";
import { UsersRepositoryInterface } from "../../../domain/repositories";

import { kysely } from "../../database";

export class UsersKyselyPostgresRepository implements UsersRepositoryInterface {
  async findUserById(id: number): Promise<UserEntity | null> {
    const user = await kysely
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return user ? UserEntity.fromObject(user) : null;
  }

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
}
