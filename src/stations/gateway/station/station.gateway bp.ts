import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { IncomingMessage } from 'http';
import { from, map, Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { User } from 'src/user/model/user.interface';
import { UserService } from 'src/user/service/user-service/user.service';
// import * as WebSocket from 'ws';
import { Server } from 'ws';

@WebSocketGateway(3011, {
  path: '/stations',
  cors: {
    origin: [
      'https://hoppscotch.io',
      'http://localhost:3010',
      'http://localhost:4200',
    ],
  },
})
export class StationGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('After init');
  }

  async handleConnection(client: WebSocket, request: IncomingMessage) {
    // try {
    console.log('Connection: ');
    // console.log(client, request);
    //   return;
    // } catch {
    //   return this.disconnect(socket);
    // }
  }

  async handleDisconnect(client: WebSocket) {
    // remove connection from DB
    // await this.connectedUserService.deleteBySocketId(socket.id);
    // socket.disconnect();
    console.log('Disconnection: ');
    // console.log(client);
  }

  // private disconnect(client: WebSocket) {
  //   // socket.emit('Error', new UnauthorizedException());
  //   socket.disconnect();
  // }

  @SubscribeMessage('events')
  onEvent(client: any, data: any): Observable<WsResponse<number>> {
    console.log('events connected');
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item }))
    );
  }
}
