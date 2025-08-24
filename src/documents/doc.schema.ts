import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class ResearchDoc {
  @Prop({ required: true }) projectId: number;
  @Prop({ required: true }) title: string;
  @Prop() content?: string;
  @Prop({ type: [String], index: true }) tags?: string[];
  @Prop() fileUrl?: string;
  @Prop() filePublicId?: string;
}
export type ResearchDocDocument = HydratedDocument<ResearchDoc>;
export const ResearchDocSchema = SchemaFactory.createForClass(ResearchDoc);
ResearchDocSchema.index({ title: 'text', content: 'text', tags: 1 });
