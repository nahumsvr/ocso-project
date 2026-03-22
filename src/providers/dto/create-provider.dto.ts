import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProviderDto extends PartialType(Provider) {
  @ApiProperty({ default: 'Bimbo' })
  @IsString()
  @MaxLength(100)
  declare providerName: string;
  @ApiProperty({ default: 'contacto@bimbo.com' })
  @IsString()
  @IsEmail()
  declare providerEmail: string;
  @ApiPropertyOptional({ default: '4421234567' })
  @IsString()
  @MaxLength(10)
  @IsOptional()
  declare providerPhoneNumber: string;
}
