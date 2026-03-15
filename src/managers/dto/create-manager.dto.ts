import { IsEmail, IsNumber, IsString, MaxLength } from "class-validator";
import { Manager } from "../entities/manager.entity";

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
}
