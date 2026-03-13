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
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Normal 40gr",
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Coca Cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 15,
      countSeal: 2,
      provider: uuid(),
    },
  ];

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.save(createProductDto);
    return newProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) return new NotFoundException();
    return product;
  }

  findByProvider(id: string) {
    const products = this.products.filter((p) => p.provider == id);
    if (products.length == 0) throw new NotFoundException();
    return products;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    //    const product = this.findOne(id);
    //    const updatedProduct = { ...product, ...updateProductDto };
    //    const updatedProducts = this.products.map((p) => {
    //      if (p.productId !== id) return p;
    //      return updatedProduct;
    //    });
    //    this.products = updatedProducts;
    //    return updatedProduct;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
    return product;
  }
}
