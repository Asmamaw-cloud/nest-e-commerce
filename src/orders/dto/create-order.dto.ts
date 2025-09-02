import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsArray()
  @IsNotEmpty({ each: true })
  items: { productId: string; quantity: number }[];
}
