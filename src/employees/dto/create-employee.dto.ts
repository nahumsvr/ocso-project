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
  @ApiProperty({ default: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsUUID("4")
  @IsOptional()
  employeeId: string;
  @ApiProperty({ default: 'John' })
  @IsString()
  @MaxLength(70)
  employeeName: string;
  @ApiProperty({ default: 'Doe' })
  @IsString()
  employeeLastName: string;
  @ApiProperty({ default: '4421234567' })
  @IsString()
  @MaxLength(10)
  employeePhoneNumber: string;
  @ApiProperty({ default: 'john.doe@email.com' })
  @IsString()
  @IsEmail()
  employeeEmail: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  location?: Location;
}
