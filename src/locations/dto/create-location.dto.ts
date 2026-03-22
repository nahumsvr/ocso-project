import {
  ArrayNotEmpty,
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { Location } from "../entities/location.entity";
import { Region } from "src/regions/entities/region.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateLocationDto {
  @ApiProperty({ default: "Ocso Juriquilla" })
  @IsString()
  @MaxLength(35)
  declare locationName: string;
  @ApiProperty({ default: "Campana 1000" })
  @IsString()
  @MaxLength(160)
  declare locationAddres: string;
  @ApiProperty({ default: [12, 12] })
  @IsArray()
  @ArrayNotEmpty()
  declare locationLatLong: number[];
  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  declare region: Region;
}
