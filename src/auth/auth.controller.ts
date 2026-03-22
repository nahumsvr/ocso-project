import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user-dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  singUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post("/signin")
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Patch("/:email")
  updateUser(
    @Param("email") email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateUser(email, updateUserDto);
  }
}
