import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Team } from 'src/team/schemas/team.schema';

export type HistoryDocument = History & Document;

@Schema()
export class History {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  redTeam: Team;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Team' })
  blueTeam: Team;
}

export const HistorySchema = SchemaFactory.createForClass(History);
