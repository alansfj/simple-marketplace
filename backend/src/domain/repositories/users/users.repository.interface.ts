import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export interface UsersRepositoryInterface {
  findUserById(id: number): Promise<UserEntity | null>;
  findUserByEmail(email: string): Promise<UserEntity | null>;
  registerUser(dto: RegisterUserDto): Promise<UserEntity | null>;
}
