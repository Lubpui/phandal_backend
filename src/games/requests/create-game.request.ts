import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGameRequest {
  @ApiProperty()
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsOptional()
  image: string;

  @ApiProperty()
  @IsOptional()
  imageShow: { image: string }[];

  @ApiProperty()
  @IsOptional()
  mode: string;
}

export class CreateGameListRequest {
  @ApiProperty()
  data: CreateGameRequest[];
}
