import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Configuration } from './configuration.schema';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Configuration',
  })
  configurations: Configuration;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
