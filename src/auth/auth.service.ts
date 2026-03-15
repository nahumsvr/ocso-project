import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateAuthDto } from "./dto/update-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async login(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      userEmail: createUserDto.userEmail,
    });

    if (!user) throw new InternalServerErrorException("El usuario no existe");

    const match = await bcrypt.compare(
      createUserDto.userPassword,
      user.userPassword,
    );

    if (!match) throw new UnauthorizedException("Credenciales incorrectas");

    const token = jwt.sign(JSON.stringify(user), "SECRET KEY");
    return { token: token };
  }
}
