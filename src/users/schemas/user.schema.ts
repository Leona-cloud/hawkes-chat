import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  user_name: string;

  @Prop({ required: true, unique: true })
  phone_number: string;

  @Prop()
  display_picture: string;

  @Prop({ default: 'Hey there!, I am using Hawkes' })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
