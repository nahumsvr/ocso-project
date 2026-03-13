import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
  @PrimaryGeneratedColumn("uuid")
  providerId: string;
  @Column("text")
  providerName: string;
  @Column("text")
  providerEmail: string;
  @Column("text", { nullable: true })
  providerPhoneNumber: string;
  @OneToMany(() => Product, (product) => product.provider)
  products: Product[];
}
