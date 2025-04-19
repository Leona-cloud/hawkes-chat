import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Group } from 'src/groups/schemas/group.schema';
import { GroupService } from 'src/groups/services/group.service';

@WebSocketGateway(5002, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private groupService: GroupService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected..... ${client.id}`);

    client.broadcast.emit('user_joined', {
      message: `User joined the chat...: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected..... ${client.id}`);
    this.server.emit('user_left', {
      message: `User left the chat...: ${client.id}`,
    });
  }

  @SubscribeMessage('send_message')
  handleMessage(@MessageBody() data: any) {
    console.log(`${data.content} sent to the group`);
    this.server.emit('reply', `${data.content}`);
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
    console.log(client);
    if (client) {
      client.join(data.group);
      console.log(`${data.clientId} joined group ${data.group}`);
      return {
        status: 'success',
        message: 'User joined group successfully!',
        data: {},
      };
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
    return {
      status: 'success',
      message: 'Message sent!',
      data: {
        message: data.content,
        reciever: data.reciever_id,
        sender: data.sender_id,
      },
    };
  }

  @SubscribeMessage('new_group')
  async handleCreateGroup(
    @MessageBody() groupData: Partial<Group>,
    @ConnectedSocket() client: Socket,
  ) {
    const newGroup = await this.groupService.createGroup(groupData);
    client.join(newGroup.id.toString());
    console.log(`${client.id} created group ${newGroup.id}`);
    this.server.to(newGroup.id).emit('new_group_created', {
      status: 'success',
      message: 'Group created successfully!',
      data: {
        group: newGroup,
        group_id: newGroup.id,
        group_name: newGroup.group_name,
        group_image: newGroup.groupImageUrl,
        created_by: newGroup.created_by,
        members: newGroup.members,
      },
    });
    return {
      status: 'success',
      message: 'Group created successfully!',
      data: {
        group: newGroup,
        group_id: newGroup.id,
        group_name: newGroup.group_name,
        group_image: newGroup.groupImageUrl,
        created_by: newGroup.created_by,
        members: newGroup.members,
      },
    };
  }
}
