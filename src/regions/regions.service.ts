import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Region } from "./entities/region.entity";
import { NotFoundError } from "rxjs";

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  async findAll() {
    return await this.regionRepository.find();
  }

  async findOne(id: number) {
    const region = await this.regionRepository.findOneBy({
      regionId: id,
    });

    if (!region) throw new NotFoundException();
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const newRegion = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto,
    });

    if (!newRegion) throw new NotFoundException();

    this.regionRepository.save(newRegion);

    return newRegion;
  }

  async remove(id: number) {
    const region = await this.findOne(id);
    this.regionRepository.delete({ regionId: id });
    return {
      message: `Region '${region.regionName}' was deleted`,
      region,
    };
  }
}
