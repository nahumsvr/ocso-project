import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ default: "user@mail.com" })
  @IsEmail()
  declare userEmail: string;
  @ApiProperty({ default: "useraaaaaaaa" })
  @IsString()
  @MinLength(8)
  declare userPassword: string;
  @ApiProperty({ default: "Employee" })
  @IsOptional()
  @IsIn(["Employee", "Manager", "Admin"])
  declare userRoles: string[];
}
