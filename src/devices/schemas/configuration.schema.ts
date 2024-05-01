import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigurationDecument = Configuration & Document;

@Schema()
export class Configuration {
  @Prop({ required: true })
  lightColor: string;

  @Prop({ required: true })
  mode: string;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
