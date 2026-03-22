import { IsEmail, IsNumber, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";
import { Location } from "src/locations/entities/location.entity";

export class CreateManagerDto extends Manager {
  @IsString()
  @MaxLength(100)
  declare managerFullname: string;
  @IsNumber()
  declare managerSalary: number;
  @IsEmail()
  declare managerEmail: string;
  @IsString()
  @MaxLength(10)
  declare managerPhoneNumber: string;
  @IsObject()
  @IsOptional()
  declare location: Location;
}
