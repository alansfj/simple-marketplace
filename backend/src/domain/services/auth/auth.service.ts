import { bcrypt, JWT } from "../../../adapters";
import { RegisterUserDto, LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { CustomError } from "../../errors";
import { AuthRepositoryInterface } from "../../repositories";
import { AuthServiceInterface } from "./auth.service.interface";

export class AuthService implements AuthServiceInterface {
  constructor(private readonly authRepository: AuthRepositoryInterface) {}

  async register(dto: RegisterUserDto): Promise<UserEntity> {
    const user = await this.authRepository.findUserByEmail(dto.email);

    if (user) throw CustomError.badRequest("user already exists");

    const hashedPassword = bcrypt.hashPassword(dto.password);

    const newUser = await this.authRepository.registerUser({
      ...dto,
      password: hashedPassword,
    });

    if (!newUser) {
      throw CustomError.internalServer("something went wrong at creating user");
    }

    return UserEntity.fromObjectPublic(newUser);
  }

  async login(
    dto: LoginUserDto
  ): Promise<{ user: UserEntity; accessToken: string; refreshToken: string }> {
    const user = await this.authRepository.findUserByEmail(dto.email);

    if (!user) throw CustomError.badRequest("user email or password wrong");

    const isCorrectPassword = bcrypt.comparePasswords(
      dto.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw CustomError.badRequest(`user email or password wrong`);
    }

    const accessToken = await JWT.generateToken(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      "15m"
    );

    if (!accessToken) throw CustomError.internalServer("error creating jwt");

    const refreshToken = await JWT.generateToken(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      "1d"
    );

    if (!refreshToken) throw CustomError.internalServer("error creating jwt");

    return {
      user: UserEntity.fromObjectPublic(user),
      accessToken,
      refreshToken,
    };
  }

  async logout(): Promise<void> {
    return await this.authRepository.logout();
  }
}
