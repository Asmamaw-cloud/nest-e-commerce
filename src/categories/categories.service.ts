import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private categories = [];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find(c => c.id === id);
  }

  create(data: any) {
    const category = { id: Date.now(), ...data };
    this.categories.push(category);
    return category;
  }

  update(id: number, data: any) {
    const category = this.findOne(id);
    Object.assign(category, data);
    return category;
  }

  remove(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
    return { message: 'Category removed' };
  }
}
