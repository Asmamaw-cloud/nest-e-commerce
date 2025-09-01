import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  @Min(1)
  rating: number;

  @IsString()
  @MaxLength(500)
  comment: string;
}
