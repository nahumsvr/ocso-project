import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
  @PrimaryGeneratedColumn("increment")
  regionId: number;
  @Column("text", {
    unique: true,
  })
  regionName: string;
  @Column("array")
  regionStates: string[];
}
