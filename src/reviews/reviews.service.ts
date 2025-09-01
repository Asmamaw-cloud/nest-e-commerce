import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  private reviews = [];

  create(reviewData: any) {
    const review = { id: Date.now(), ...reviewData };
    this.reviews.push(review);
    return review;
  }

  findAllByProduct(productId: number) {
    return this.reviews.filter(r => r.productId === productId);
  }
}
