import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { userId, items } = createOrderDto;

      // Validate userId
      if (!Types.ObjectId.isValid(userId)) throw new BadRequestException('Invalid userId');
      const user = await this.userModel.findById(userId);
      if (!user) throw new NotFoundException('User not found');

      // Validate products and prepare mappedItems
      const mappedItems: { product: string; quantity: number }[] = [];
      for (const item of items) {
        if (!Types.ObjectId.isValid(item.productId)) {
          throw new BadRequestException(`Invalid productId: ${item.productId}`);
        }
        const product = await this.productModel.findById(item.productId);
        if (!product) throw new NotFoundException(`Product not found: ${item.productId}`);
        if (product.stock < item.quantity) {
          throw new BadRequestException(`Not enough stock for product: ${product.name}`);
        }

        mappedItems.push({ product: item.productId, quantity: item.quantity });
      }

      // Create order
      const order = new this.orderModel({
        user: userId,
        items: mappedItems,
        status: 'pending', // default status
      });

      return await order.save();
    } catch (error) {
      console.error('Create order error:', error);
      throw error;
    }
  }

  // Fetch all orders with populated user and product info
  findAll() {
    return this.orderModel.find().populate('user items.product').exec();
  }

  // Fetch one order by ID with populated user and product info
  findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid order id');
    return this.orderModel.findById(id).populate('user items.product').exec();
  }

  // Update order status
  updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid order id');
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderStatusDto, { new: true })
      .populate('user items.product')
      .exec();
  }

  // Remove order
  remove(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid order id');
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
