import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
) {}

  // create(createReviewDto: CreateReviewDto) {
  //   const review = new this.reviewModel(createReviewDto);
  //   return review.save();
  // }

  async create(createReviewDto: CreateReviewDto) {
    const { productId, userId, rating, comment } = createReviewDto;

    // Validate ObjectId
    if (!Types.ObjectId.isValid(productId)) {
      throw new BadRequestException('Invalid productId');
    }
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId');
    }

    // Check existence
    const product = await this.productModel.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    // Map DTO to schema
    const review = new this.reviewModel({
      product: productId,
      user: userId,
      rating,
      comment,
    });

    return review.save();
  }

  findAll() {
    return this.reviewModel.find().populate('user product').exec();
  }

  findByProduct(productId: string) {
    return this.reviewModel.find({ product: productId }).populate('user').exec();
  }

  remove(id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
