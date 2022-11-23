import { UserEntity } from 'src/user/model/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from '../room/room.entity';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.messages)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => UserEntity, (room) => room.messages)
  @JoinColumn()
  room: RoomEntity;
}
