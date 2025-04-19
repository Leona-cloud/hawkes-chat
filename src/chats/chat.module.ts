import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { GroupModule } from 'src/groups/group.module';
import { GroupService } from 'src/groups/services/group.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from 'src/groups/schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    GroupModule,
  ],
  providers: [ChatGateway, GroupService],
  exports: [ChatGateway],
})
export class ChatModule {}
