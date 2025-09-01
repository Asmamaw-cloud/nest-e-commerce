import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private products = [];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(p => p.id === id);
  }

  create(productData: any) {
    const product = { id: Date.now(), ...productData };
    this.products.push(product);
    return product;
  }

  update(id: number, updateData: any) {
    const product = this.findOne(id);
    Object.assign(product, updateData);
    return product;
  }

  remove(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    return { message: 'Product removed' };
  }
}
