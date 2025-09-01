export class CreateOrderDto {
  readonly userId: number;
  readonly items: { productId: number; quantity: number }[];
}
