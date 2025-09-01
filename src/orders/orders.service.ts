import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  private orders = [];

  findAll() {
    return this.orders;
  }

  findOne(id: number) {
    return this.orders.find(o => o.id === id);
  }

  create(orderData: any) {
    const order = { id: Date.now(), status: 'pending', ...orderData };
    this.orders.push(order);
    return order;
  }

  updateStatus(id: number, status: string) {
    const order = this.findOne(id);
    order.status = status;
    return order;
  }
}
