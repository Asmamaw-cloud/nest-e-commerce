import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  items: { productId: number; quantity: number }[];
}
