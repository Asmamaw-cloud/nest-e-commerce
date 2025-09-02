import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  addToCart(userId: string, addToCartDto: AddToCartDto) {
    return this.cartModel.findOneAndUpdate(
      { user: userId },
      { $push: { items: addToCartDto } },
      { new: true, upsert: true },
    ).exec();
  }

  getCart(userId: string) {
    return this.cartModel.findOne({ user: userId }).populate('items.product').exec();
  }

  removeItem(userId: string, productId: string) {
    return this.cartModel.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { product: productId } } },
      { new: true },
    ).exec();
  }

  clearCart(userId: string) {
    return this.cartModel.findOneAndUpdate({ user: userId }, { items: [] }, { new: true }).exec();
  }
}
