import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ResearchDoc extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ResearchDocSchema = SchemaFactory.createForClass(ResearchDoc);
