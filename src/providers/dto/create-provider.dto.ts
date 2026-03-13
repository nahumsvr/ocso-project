import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";
import { PartialType } from "@nestjs/mapped-types";

export class CreateProviderDto extends PartialType(Provider) {
  @IsString()
  @MaxLength(100)
  declare providerName: string;
  @IsString()
  @IsEmail()
  declare providerEmail: string;
  @IsString()
  @MaxLength(10)
  @IsOptional()
  declare providerPhoneNumber: string;
}
