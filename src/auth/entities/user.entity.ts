import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Manager } from "src/managers/entities/manager.entity";
import { Employee } from "src/employees/entities/employee.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId?: string;
  @Column("text", { unique: true })
  userEmail: string;
  @Exclude()
  @Column("text")
  userPassword: string;
  @Column("simple-array", {default: "Employee"})
  userRoles: string[];
  @OneToOne(() => Manager)
  manager: Manager;
  @OneToOne(() => Employee)
  employee: Employee;
}
