import { Injectable, NotFoundException } from "@nestjs/common";
import { QueryBuilder, Repository } from "typeorm";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "./entities/location.entity";
import { Manager } from "src/managers/entities/manager.entity";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
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
    // set manager to null
    this.managerRepository
      .createQueryBuilder()
      .update()
      .set({ location: null })
      .where("locationId = :id", {
        id,
      })
      .execute();

    const updatedLocation = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    });

    if (!updatedLocation) throw new NotFoundException();

    const savedLocation = await this.locationRepository.save(updatedLocation);

    const updated = await this.managerRepository.preload({
      managerId: updateLocationDto.manager,
      location: updatedLocation,
    });

    if (!updated) throw new NotFoundException();

    this.managerRepository.save(updated);

    return savedLocation;
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
