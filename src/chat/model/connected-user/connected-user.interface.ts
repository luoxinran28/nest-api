import { User } from 'src/user/model/user.interface';

export interface ConnectedUser {
  id?: number;
  socketId: string;
  user: User;
}
