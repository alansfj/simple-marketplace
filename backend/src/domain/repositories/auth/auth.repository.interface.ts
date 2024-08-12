import { LoginUserDto, RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities";

export interface AuthRepositoryInterface {
  register(dto: RegisterUserDto): Promise<UserEntity>;
  login(
    dto: LoginUserDto
  ): Promise<{ user: UserEntity; accessToken: string; refreshToken: string }>;
  logout(): Promise<void>;
}
