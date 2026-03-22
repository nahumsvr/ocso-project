import { Location } from "src/locations/entities/location.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Region {
  @PrimaryGeneratedColumn("increment")
  regionId: number;
  @ApiProperty({ default: 'Centro' })
  @Column("text", {
    unique: true,
  })
  regionName: string;
  @ApiProperty({ default: ['Queretaro', 'Guanajuato'] })
  @Column("simple-array")
  regionStates: string[];
  @OneToMany(() => Location, (location) => location.region)
  locations: Location[];
}
