import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail()
    @IsString()
    userEmail: string
    @MinLength(8)
    @IsString()
    userPassword: string
}