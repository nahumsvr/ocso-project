import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Manager } from "./entities/manager.entity";

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  async create(createManagerDto: CreateManagerDto) {
    return await this.managerRepository.save(createManagerDto);
  }

  async findAll() {
    return await this.managerRepository.find();
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOneBy({ managerId: id });
    if (!manager) throw new NotFoundException();
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const newManager = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto,
    });

    if (!newManager) throw new NotFoundException();

    this.managerRepository.save(newManager);

    return newManager;
  }

  async remove(id: string) {
    const manager = await this.findOne(id);
    this.managerRepository.delete({ managerId: id });

    return {
      message: `Manager '${manager.managerFullname}' was deleted`,
      manager,
    };
  }
}
