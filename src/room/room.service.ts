import { Injectable } from '@nestjs/common';
import { RoomDto } from './dto/room.dto';
import { Server } from 'socket.io';

@Injectable()
export class RoomService {
  onNewMessage(roomDto: RoomDto, server: Server) {
    console.log(roomDto);
    server.emit('onMessage', { msg: 'New Message', content: roomDto });
  }
}
