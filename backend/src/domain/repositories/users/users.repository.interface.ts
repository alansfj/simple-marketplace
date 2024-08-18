import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export interface UsersRepositoryInterface {
  findUserByEmail(email: string): Promise<UserEntity | null>;
  registerUser(dto: RegisterUserDto): Promise<UserEntity | null>;
}
