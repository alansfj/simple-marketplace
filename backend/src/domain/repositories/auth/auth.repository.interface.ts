import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export interface AuthRepositoryInterface {
  findUserByEmail(email: string): Promise<UserEntity | null>;
  registerUser(dto: RegisterUserDto): Promise<UserEntity | null>;
  logout(): Promise<void>;
}
