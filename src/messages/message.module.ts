import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessageService } from './services/message.service';
import { MessageController } from './controller.ts/message.controller';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
