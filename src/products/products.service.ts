import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.save(createProductDto);
    return newProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) throw new NotFoundException();
    return product;
  }

  async findByProvider(id: string) {
    const product = await this.productRepository.findBy({
      provider: {
        providerId: id,
      },
    });

    if (product.length == 0) throw new NotFoundException();

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });

    if (!productToUpdate) throw new NotFoundException();

    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
    return {
      message: `Product '${product.productName}' was deleted`,
      product,
    };
  }
}
