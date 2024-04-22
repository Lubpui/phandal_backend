import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScoreDocument = Score & Document;

@Schema()
export class Score {
  @Prop({ required: true })
  killed: number;

  @Prop({ required: true })
  death: number;

  @Prop({ required: true })
  short: number;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
