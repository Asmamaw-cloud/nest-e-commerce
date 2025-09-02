import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: [{ product: { type: Types.ObjectId, ref: 'Product' }, quantity: Number }] })
  items: { product: string; quantity: number }[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
