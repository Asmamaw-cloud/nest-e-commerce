import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async pay(orderId: number, amount: number) {
    // TODO: integrate real payment gateway
    return { message: `Payment of $${amount} for order ${orderId} processed.` };
  }
}
