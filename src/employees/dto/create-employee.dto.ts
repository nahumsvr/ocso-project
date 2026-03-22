import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @IsUUID("4")
  @IsOptional()
  employeeId: string;
  @ApiProperty()
  @IsString()
  @MaxLength(70)
  employeeName: string;
  @ApiProperty()
  @IsString()
  employeeLastName: string;
  @ApiProperty()
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;
  @ApiProperty()
  @IsString()
  @IsEmail()
  employeeEmail: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  location?: Location;
}
