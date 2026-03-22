import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "src/providers/entities/provider.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateProductDto extends Product {
  @ApiPropertyOptional({ default: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsUUID("4")
  @IsOptional()
  declare productId: string;
  @ApiProperty({ default: 'Gansito' })
  @IsString()
  @MaxLength(40)
  declare productName: string;
  @ApiProperty({ default: 15.5 })
  @IsNumber()
  declare price: number;
  @ApiProperty({ default: 100 })
  @IsInt()
  declare countSeal: number;
  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  declare provider: Provider;
}
