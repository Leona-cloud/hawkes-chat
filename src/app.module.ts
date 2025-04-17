import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { MessageModule } from './messages/message.module';
import { GroupModule } from './groups/group.module';
import { ChatModule } from './chats/chat.module';
import { ChatGateway } from './chats/chat.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_CONNECT as string),
    UserModule,
    MessageModule,
    GroupModule,
    ChatModule
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
