import { bcrypt } from "../../../adapters";
import { RegisterUserDto, LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities";
import { CustomError } from "../../errors";
import { UsersRepositoryInterface } from "../../repositories";
import { TokenServiceInterface } from "../token";
import { AuthServiceInterface } from "./auth.service.interface";

export class AuthService implements AuthServiceInterface {
  constructor(
    private readonly usersRepository: UsersRepositoryInterface,
    private readonly tokenService: TokenServiceInterface
  ) {}

  async register(dto: RegisterUserDto): Promise<UserEntity> {
    const user = await this.usersRepository.findUserByEmail(dto.email);

    if (user) throw CustomError.badRequest("user already exists");

    const hashedPassword = bcrypt.hashPassword(dto.password);

    const newUser = await this.usersRepository.registerUser({
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
    const user = await this.usersRepository.findUserByEmail(dto.email);

    if (!user) throw CustomError.badRequest("user email or password wrong");

    const isCorrectPassword = bcrypt.comparePasswords(
      dto.password,
      user.password
    );

    if (!isCorrectPassword) {
      throw CustomError.badRequest(`user email or password wrong`);
    }

    const accessToken = await this.tokenService.generateToken(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      "15m"
    );

    const refreshToken = await this.tokenService.generateToken(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      "1d"
    );

    return {
      user: UserEntity.fromObjectPublic(user),
      accessToken,
      refreshToken,
    };
  }
}
