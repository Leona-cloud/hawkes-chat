import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender_id: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  reciever_id?: string;

  @Prop({ type: Types.ObjectId, ref: 'Group' })
  group_id?: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: 'text' })
  messageType: string;

  @Prop({ default: false })
  is_read: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
