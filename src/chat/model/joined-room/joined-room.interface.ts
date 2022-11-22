import { User } from 'src/user/model/user.interface';
import { Room } from '../room/room.interface';

export interface JoinedRoom {
  id?: number;
  socketId: string;
  user: User;
  room: Room;
}
