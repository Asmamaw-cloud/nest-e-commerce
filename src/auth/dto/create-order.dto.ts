export class CreateOrderDto {
  readonly userId: number;
  readonly items: { productId: string; quantity: number }[];
}
