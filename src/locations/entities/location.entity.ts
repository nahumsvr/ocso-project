import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Manager } from "src/managers/entities/manager.entity";
import { Region } from "src/regions/entities/region.entity";
import { Employee } from "src/employees/entities/employee.entity";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId?: number;
  @Column("text")
  locationName: string;
  @Column("text")
  locationAddres: string;
  @Column("simple-array")
  locationLatLong: number[];
  @OneToOne(() => Manager)
  @JoinColumn({ name: "managerId" })
  manager: Manager;
  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({ name: "regionId" })
  region: Region;
  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
