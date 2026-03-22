import { IsArray, IsString, MaxLength } from "class-validator";
import { Region } from "../entities/region.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto extends Region {
  @ApiProperty({ default: 'Centro' })
  @IsString()
  @MaxLength(100)
  declare regionName: string;
  @ApiProperty({ default: ['Queretaro', 'Guanajuato'] })
  @IsArray()
  declare regionStates: string[];
}
