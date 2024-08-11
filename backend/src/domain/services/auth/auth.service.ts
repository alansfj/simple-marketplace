import { RegisterUserDto, LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { AuthRepositoryInterface } from "../../repositories";
import { AuthServiceInterface } from "./auth.service.interface";

export class AuthService implements AuthServiceInterface {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  async register(dto: RegisterUserDto): Promise<UserEntity> {
    return await this.authRepository.register(dto);
  }

  async login(dto: LoginUserDto): Promise<UserEntity> {
    return await this.authRepository.login(dto);
  }
}
