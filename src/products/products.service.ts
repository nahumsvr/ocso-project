import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { v4 as uuid } from "uuid";
import { NotFoundError } from "rxjs";

@Injectable()
export class ProductsService {
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
  create(createProductDto: CreateProductDto) {
    if (!createProductDto.productId) createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.productId == id);
    if (!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string) {
    const products = this.products.filter((p) => p.provider == id);
    if (products.length == 0) throw new NotFoundException();
    return products;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);
    const updatedProduct = { ...product, ...updateProductDto };
    const updatedProducts = this.products.map((p) => {
      if (p.productId !== id) return p;
      return updatedProduct;
    });
    this.products = updatedProducts;
    return updatedProduct;
  }

  remove(id: string) {
    const product = this.findOne(id);
    const updatedProducts = this.products.filter((p) => p.productId !== id);
    this.products = updatedProducts;
    return product;
  }
}
