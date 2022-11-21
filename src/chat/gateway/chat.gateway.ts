import { UnauthorizedException } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthService } from 'src/auth/service/auth.service';
import { UserService } from 'src/user/service/user-service/user.service';

@WebSocketGateway({
  cors: {
    origin: [
      'https://hoppscotch.io',
      'http://localhost:3010',
      'http://localhost:4200',
    ],
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async afterInit() {
    // await this.connectedUserService.deleteAll();
    // await this.joinedRoomService.deleteAll();
  }

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(
        socket.handshake.headers.authorization
      );
      // const user: User = await this.userService.getOne(decodedToken.user.id);
      // if (!user) {
      //   return this.disconnect(socket);
      // } else {
      //   socket.data.user = user;
      //   const rooms = await this.roomService.getRoomsForUser(user.id, {
      //     page: 1,
      //     limit: 10,
      //   });
      //   // substract page -1 to match the angular material paginator
      //   rooms.meta.currentPage = rooms.meta.currentPage - 1;
      //   // Save connection to DB
      //   await this.connectedUserService.create({ socketId: socket.id, user });
      //   // Only emit rooms to the specific connected client
      //   return this.server.to(socket.id).emit('rooms', rooms);
      // }
      return decodedToken;
    } catch {
      return this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    // remove connection from DB
    // await this.connectedUserService.deleteBySocketId(socket.id);
    socket.disconnect();
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }
}
