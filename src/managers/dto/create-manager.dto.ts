import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateManagerDto extends Manager {
  @ApiProperty({ default: 'Jane Doe' })
  @IsString()
  @MaxLength(100)
  declare managerFullname: string;
  @ApiProperty({ default: 12000 })
  @IsNumber()
  declare managerSalary: number;
  @ApiProperty({ default: 'jane.doe@email.com' })
  @IsEmail()
  declare managerEmail: string;
  @ApiProperty({ default: '4421234567' })
  @IsString()
  @MaxLength(10)
  declare managerPhoneNumber: string;
  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  declare location: Location;
}
