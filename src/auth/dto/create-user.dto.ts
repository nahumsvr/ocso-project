import { IsEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  declare userEmail: string;
  @IsString()
  @MinLength(8)
  declare userPassword: string;
  @IsOptional()
  @IsIn(["Employee", "Manager", "Admin"])
  declare userRoles: string[];
}
