import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Configulation } from './configulation.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Configulation',
  })
  configulations: Configulation;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
