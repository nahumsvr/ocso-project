import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  userId?: string;
  @Column("text", { unique: true })
  userEmail: string;
  @Exclude()
  @Column("text")
  userPassword: string;
}
