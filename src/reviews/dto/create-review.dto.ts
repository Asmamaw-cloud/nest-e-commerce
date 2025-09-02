import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
productId: string;

@IsString()
userId: string;

  @IsNumber()
  @Min(1)
  rating: number;

  @IsString()
  @MaxLength(500)
  comment: string;
}
