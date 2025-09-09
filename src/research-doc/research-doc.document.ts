import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResearchDocDocument = HydratedDocument<ResearchDoc>;

@Schema({ timestamps: true })
export class ResearchDoc {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true, index: true })
  projectId: string;

  @Prop({ required: true })
  avatarFd: string;
}

export const ResearchDocSchema = SchemaFactory.createForClass(ResearchDoc);
ResearchDocSchema.index({ title: 'text', content: 'text', tags: 'text' });
