import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GameResponse {
  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  Expose;
  image: string;

  @ApiProperty()
  @Expose()
  imageShow: { image: string }[];

  @ApiProperty()
  @Expose()
  mode: string;
}
