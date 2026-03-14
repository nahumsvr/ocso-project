import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "./entities/location.entity";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    return await this.locationRepository.save(createLocationDto);
  }

  async findAll() {
    return await this.locationRepository.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    });
    if (!location) throw new NotFoundException();
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const updatedLocation = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!updatedLocation) throw new NotFoundException();

    this.locationRepository.save(updatedLocation);
    return updatedLocation;
  }

  async remove(id: number) {
    const location = await this.findOne(id);
    this.locationRepository.delete({
      locationId: id,
    });
    return {
      message: `Location '${location.locationName}' was deleted`,
      location,
    };
  }
}
