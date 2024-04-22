import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SummaryScoreDocument = SummaryScore & Document;

@Schema()
export class SummaryScore {
  @Prop({ required: true })
  killed: number;

  @Prop({ required: true })
  death: number;

  @Prop({ required: true })
  short: number;

  @Prop({ required: true })
  winCount: number;

  @Prop({ required: true })
  loseCount: number;
}

export const SummaryScoreSchema = SchemaFactory.createForClass(SummaryScore);
