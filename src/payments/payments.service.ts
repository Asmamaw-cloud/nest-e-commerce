import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { PaymentDto } from './dto/payment.dto';
import { Order, OrderDocument } from '../orders/schemas/order.schema';
import {User, UserDocument} from '../users/schemas/user.schema';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  @InjectModel(Order.name) private orderModel: Model<OrderDocument>,  // inject Order
    @InjectModel(User.name) private userModel: Model<UserDocument>,
) {}

  async create(paymentDto: PaymentDto) {
  const { orderId, userId, amount } = paymentDto;

  if (!Types.ObjectId.isValid(orderId)) throw new BadRequestException('Invalid orderId');
  if (!Types.ObjectId.isValid(userId)) throw new BadRequestException('Invalid userId');

  const order = await this.orderModel.findById(orderId);
  if (!order) throw new NotFoundException('Order not found');

  const user = await this.userModel.findById(userId);
  if (!user) throw new NotFoundException('User not found');

  const payment = new this.paymentModel({ order: orderId, user: userId, amount, status: 'pending' });
  return payment.save();
}


  findAll() {
    return this.paymentModel.find().populate('user order').exec();
  }

  findOne(id: string) {
    return this.paymentModel.findById(id).populate('user order').exec();
  }

  updateStatus(id: string, status: string) {
    return this.paymentModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }
}
