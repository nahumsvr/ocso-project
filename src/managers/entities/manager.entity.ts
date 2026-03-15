import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
  @PrimaryGeneratedColumn("uuid")
  managerId: string;
  @Column("text")
  managerFullname: string;
  @Column("float")
  managerSalary: number;
  @Column("text")
  managerEmail: string;
  @Column("text")
  managerPhoneNumber: string;
}
