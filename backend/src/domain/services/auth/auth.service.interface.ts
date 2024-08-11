import { LoginUserDto, RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export interface AuthServiceInterface {
  register(dto: RegisterUserDto): Promise<UserEntity>;
  login(dto: LoginUserDto): Promise<UserEntity>;
}
