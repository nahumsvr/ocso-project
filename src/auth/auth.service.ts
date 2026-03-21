import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user-dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.userPassword, 10);
      const userData = { ...createUserDto, userPassword: hashedPassword };

      const newUser = this.userRepository.create(userData);

      return await this.userRepository.save(newUser);
    } catch {
      throw new InternalServerErrorException(
        "Error inesperado al crear el usuario",
      );
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      userEmail: loginUserDto.userEmail,
    });

    if (!user) throw new InternalServerErrorException("El usuario no existe");

    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );

    if (!match) throw new UnauthorizedException("Credenciales incorrectas");

    const token = this.jwtService.sign({
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    })

    return { token: token };
  }
}
