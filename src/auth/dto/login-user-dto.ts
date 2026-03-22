import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @ApiProperty({ default: "user@mail.com" })
  @IsEmail()
  @IsString()
  userEmail: string;
  @ApiProperty({ default: "useraaaaaaaa" })
  @MinLength(8)
  @IsString()
  userPassword: string;
}
