import { Location } from "src/locations/entities/location.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Region {
  @PrimaryGeneratedColumn("increment")
  regionId: number;
  @Column("text", {
    unique: true,
  })
  regionName: string;
  @Column("simple-array")
  regionStates: string[];
  @OneToMany(() => Location, (location) => location.region)
  locations: Location[];
}
