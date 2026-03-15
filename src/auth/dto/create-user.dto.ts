import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  declare userEmail: string;
  @IsString()
  @MinLength(8)
  declare userPassword: string;
}
