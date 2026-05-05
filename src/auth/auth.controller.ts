import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  Post,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user-dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";
import type { Response } from "express";
import { COOKIE_NAME } from "./constants/jwt.constants";
import { log } from "node:console";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  singUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }
  @Post("/register/employee/:id")
  registerEmployee(
    @Body() createUserDto: CreateUserDto,
    @Param("id") id: string,
  ) {
    if (
      createUserDto.userRoles.includes("Admin") ||
      createUserDto.userRoles.includes("Manager")
    )
      throw new BadRequestException("Rol inválido");

    return this.authService.registerEmployee(id, createUserDto);
  }
  @Post("/register/manager")
  registerManager(@Body() createUserDto: CreateUserDto) {
    if (
      createUserDto.userRoles.includes("Admin") ||
      createUserDto.userRoles.includes("Employee")
    )
      throw new BadRequestException("Rol inválido");

    return this.authService.registerUser(createUserDto);
  }

  @Post("/signin")
  async signIn(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(loginUserDto);
    response.cookie(COOKIE_NAME, token.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return { token };
  }

  @Patch("/:email")
  updateUser(
    @Param("email") email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(email, updateUserDto);
  }
}
