import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Score } from './score.schema';
import { User } from 'src/user/schemas/user.schema';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Score' })
  score: Score;

  @Prop({ required: true })
  team: string;

  @Prop({ required: true })
  competitionResult: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
