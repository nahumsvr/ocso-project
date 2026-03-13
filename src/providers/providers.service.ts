import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { CreateProviderDto } from "./dto/create-provider.dto";
import { UpdateProviderDto } from "./dto/update-provider.dto";
import { Provider } from "./entities/provider.entity";

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    return await this.providerRepository.save(createProviderDto);
  }

  async findAll() {
    return await this.providerRepository.find();
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOneBy({
      providerId: id,
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }

  async findOneByName(name: string) {
    const provider = await this.providerRepository.findOneBy({
      providerName: Like(name),
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const newProvider = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });

    if (!newProvider) throw new NotFoundException();

    this.providerRepository.save(newProvider);

    return newProvider;
  }

  async remove(id: string) {
    const provider = await this.findOne(id);
    await this.providerRepository.delete(id);
    return {
      message: `Provider '${provider.providerName}' was deleted`,
      provider,
    };
  }
}
