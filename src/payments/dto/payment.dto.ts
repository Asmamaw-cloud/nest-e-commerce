import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentDto {
  @IsNumber()
  orderId: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  userId: number;
}
