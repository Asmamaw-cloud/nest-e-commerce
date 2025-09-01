import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
  private carts: Record<number, any[]> = {}; // userId -> items[]

  addItem(userId: number, product: any) {
    if (!this.carts[userId]) this.carts[userId] = [];
    this.carts[userId].push(product);
    return this.carts[userId];
  }

  getCart(userId: number) {
    return this.carts[userId] || [];
  }

  removeItem(userId: number, productId: number) {
    this.carts[userId] = (this.carts[userId] || []).filter(p => p.id !== productId);
    return this.carts[userId];
  }
}
