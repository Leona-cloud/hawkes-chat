import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { Message } from '../schemas/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  async sendMessage(@Body() messageData: Partial<Message>) {
    return await this.messageService.sendMessage(messageData);
  }

  @Get(':id')
  async retrieveUserMessages(@Param('id') id: string) {
    return await this.messageService.retrieveUserMessages(id);
  }
}
