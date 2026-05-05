import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user-dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Employee } from "src/employees/entities/employee.entity";
import { Manager } from "src/managers/entities/manager.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
    private jwtService: JwtService,
  ) {}

  async registerEmployee(id: string, createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.userPassword, 10);
      const userData = { ...createUserDto, userPassword: hashedPassword };

      const newUser = this.userRepository.create(userData);

      await this.userRepository.save(newUser);

      const employeeToUpdate = await this.employeeRepository.preload({
        employeeId: id,
      });

      if (employeeToUpdate == undefined)
        throw new InternalServerErrorException(
          "Error inesperado al crear el usuario",
        );

      employeeToUpdate.user = newUser;

      return this.employeeRepository.save(employeeToUpdate);
    } catch {
      throw new InternalServerErrorException(
        "Error inesperado al crear el usuario",
      );
    }
  }

  async registerManager(id: string, createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.userPassword, 10);
      const userData = { ...createUserDto, userPassword: hashedPassword };

      const newUser = this.userRepository.create(userData);

      await this.userRepository.save(newUser);

      const employeeToUpdate = await this.managerRepository.preload({
        managerId: id,
      });

      if (employeeToUpdate == undefined)
        throw new InternalServerErrorException(
          "Error inesperado al crear el usuario",
        );

      employeeToUpdate.user = newUser;

      return this.managerRepository.save(employeeToUpdate);
    } catch {
      throw new InternalServerErrorException(
        "Error inesperado al crear el usuario",
      );
    }
  }

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

    if (!user) throw new UnauthorizedException("Credenciales incorrectas");

    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );

    if (!match) throw new UnauthorizedException("Credenciales incorrectas");

    const token = this.jwtService.sign({
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles,
    });

    return { token: token };
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.preload({
      userEmail: userEmail,
      ...updateUserDto,
    });

    if (!updatedUser) throw new NotFoundException("El usuario no existe");

    return await this.userRepository.save(updatedUser);
  }
}
