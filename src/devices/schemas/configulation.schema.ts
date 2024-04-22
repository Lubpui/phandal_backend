import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConfigulationDecument = Configulation & Document;

@Schema()
export class Configulation {
  @Prop({ defaultValue: 'red' })
  lightColor: string;

  @Prop({ defaultValue: 1 })
  recoil: number;

  @Prop({ defaultValue: 'semi' })
  mode: string;
}

export const ConfigulationSchema = SchemaFactory.createForClass(Configulation);
