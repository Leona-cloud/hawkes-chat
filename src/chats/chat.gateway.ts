import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: any) {
    console.log(`${data.content} sent to the group`);
    this.server.to(data.group_id).emit('new_message', data);
    console.log('done!!!!!');
    return {
      status: 'success',
      message: 'Message sent!',
      data: {
        message: data.content,
        group: data.group_id,
        sender: data.sender_id,
      },
    };
  }

  @SubscribeMessage('join_group')
  handleJoinGroup(@MessageBody() data: any) {
    const client = this.server.sockets.sockets.get(data.clientId);
    if (client) {
      client.join(data.group);
      console.log(`${data.clientId} joined group ${data.group}`);
    }
  }

  @SubscribeMessage('send_private_message')
  handlePrivateSendMessage(
    @MessageBody()
    data: {
      sender_id: string;
      reciever_id: string;
      content: string;
    },
  ) {
    this.server
      .to(`user:${data.reciever_id}`)
      .emit('new_private_message', data);
  }
}
