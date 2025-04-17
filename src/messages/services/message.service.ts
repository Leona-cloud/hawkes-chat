import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async sendMessage(messageData: Partial<Message>): Promise<Message> {
    const newMessage = new this.messageModel(messageData);

    return await newMessage.save();
  }

  async retrieveUserMessages(userId: string): Promise<Message[]> {
    return this.messageModel
      .find({
        $or: [
          {
            sender_id: userId,
          },
          { reciever_id: userId },
        ],
      })
      .populate('sender_id', 'user_name phone_number display_picture')
      .populate('reciever_id', 'user_name phone_number display_picture')
      .exec();
  }
}
