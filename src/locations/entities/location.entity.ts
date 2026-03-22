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
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
  @PrimaryGeneratedColumn("increment")
  locationId?: number;
  @ApiProperty({ default: "Ocso Juriquilla" })
  @Column("text")
  locationName: string;
  @ApiProperty({ default: "Campana 1000" })
  @Column("text")
  locationAddres: string;
  @ApiProperty({ default: [12, 12] })
  @Column("simple-array")
  locationLatLong: number[];
  @OneToOne(() => Manager, {eager: true})
  @JoinColumn({ name: "managerId"})
  manager: Manager;
  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({ name: "regionId" })
  region: Region;
  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}
