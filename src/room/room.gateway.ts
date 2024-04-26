import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomService } from './room.service';
import { RoomDto } from './dto/room.dto';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class RoomGateway implements OnModuleInit {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer() server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Connected... ID: ${socket.id}`);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() roomDto: RoomDto) {
    return this.roomService.onNewMessage(roomDto, this.server);
  }
}
