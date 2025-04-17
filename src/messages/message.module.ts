import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageService } from './services/message.service';
import { MessageController } from './controller.ts/message.controller';
import { ChatModule } from 'src/chats/chat.module';
import { ChatGateway } from 'src/chats/chat.gateway';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ChatModule
  ],
  providers: [MessageService, ChatGateway],
  controllers: [MessageController],
})
export class MessageModule {}
