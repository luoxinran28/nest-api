import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JoinedRoomEntity } from 'src/chat/model/joined-room/joined-room.entity';
import { JoinedRoom } from 'src/chat/model/joined-room/joined-room.interface';
import { Room } from 'src/chat/model/room/room.interface';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class JoinedRoomService {
  constructor(
    @InjectRepository(JoinedRoomEntity)
    private readonly joinedRoomRepository: Repository<JoinedRoomEntity>
  ) {}

  async create(joinedRoom: JoinedRoom): Promise<JoinedRoom> {
    return this.joinedRoomRepository.save(joinedRoom);
  }

  async findByUser(user: User): Promise<JoinedRoom[]> {
    const userId = user?.id;
    return this.joinedRoomRepository.find({ where: { id: userId } });
  }

  async findByRoom(room: Room): Promise<JoinedRoom[]> {
    const roomId = room?.id;
    return this.joinedRoomRepository.find({ where: { id: roomId } });
  }

  async deleteBySocketId(socketId: string) {
    return this.joinedRoomRepository.delete({ socketId });
  }

  async deleteAll() {
    await this.joinedRoomRepository.createQueryBuilder().delete().execute();
  }
}
