import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GroupDocument = Group & Document;

@Schema({ timestamps: true })
export class Group {
  @Prop({ required: true })
  group_name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  created_by: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  members: string[];

  @Prop()
  groupImageUrl: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
