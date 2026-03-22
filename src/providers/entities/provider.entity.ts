import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
export class Provider {
  @ApiProperty({ default: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn("uuid")
  providerId: string;
  @ApiProperty({ default: 'Bimbo' })
  @Column("text")
  providerName: string;
  @ApiProperty({ default: 'contacto@bimbo.com' })
  @Column("text", {unique: true})
  providerEmail: string;
  @ApiPropertyOptional({ default: '4421234567' })
  @Column("text", { nullable: true })
  providerPhoneNumber: string;
  @OneToMany(() => Product, (product) => product.provider)
  products: Product[];
}
