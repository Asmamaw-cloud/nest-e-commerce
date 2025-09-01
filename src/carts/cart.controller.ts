import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartService.getCart(userId);
  }

  @Post(':userId')
  addItem(@Param('userId') userId: number, @Body() body: any) {
    return this.cartService.addItem(userId, body);
  }

  @Delete(':userId/:productId')
  removeItem(@Param('userId') userId: number, @Param('productId') productId: number) {
    return this.cartService.removeItem(userId, productId);
  }
}
