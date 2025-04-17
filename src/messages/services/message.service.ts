import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { ChatGateway } from 'src/chats/chat.gateway';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private chatGateway: ChatGateway,
  ) {}

  async sendMessage(messageData: Partial<Message>): Promise<Message> {
    const newMessage = new this.messageModel(messageData);

    const savedMessage = await newMessage.save();

    if (messageData.group_id) {
      console.log('babe')
      this.chatGateway.server
        .to(messageData.group_id)
        .emit('new_message', savedMessage);
    } else if (messageData.reciever_id) {
      this.chatGateway.server
        .to(`user:${messageData.reciever_id}`)
        .emit('new_private_message', savedMessage);
    }

    return savedMessage;
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

  async getMessagesForAGroup(group_id: string): Promise<Message[]> {
    return await this.messageModel
      .find({ group_id: group_id })
      .populate('sender_id', 'user_name, phone_number')
      .sort({ createdAt: 1 })
      .exec();
  }
}
