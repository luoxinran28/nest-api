import { User } from 'src/user/model/user.interface';
import { Room } from '../room/room.interface';

export interface Message {
  id?: number;
  text: string;
  created_at: Date;
  updated_at: Date;
  user: User;
  room: Room;
}
