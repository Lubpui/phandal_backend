import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Device } from 'src/devices/schemas/device.schema';
import { SummaryScore } from './summaryScore.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  birthdate: string;

  @Prop()
  image: string;

  @Prop()
  password: string;

  @Prop()
  fname: string;

  @Prop()
  lname: string;

  @Prop()
  code: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }] })
  devices: Device[] | string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SummaryScore',
  })
  summaryScore: SummaryScore;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
