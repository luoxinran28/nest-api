import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { User } from 'src/user/model/user.interface';
import { Repository } from 'typeorm';
import { RoomEntity } from '../../model/room/room.entity';
import { Room } from '../../model/room/room.interface';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>
  ) {}

  async createRoom(room: Room, creator: User): Promise<Room> {
    const newRoom = await this.addCreatorToRoom(room, creator);
    return this.roomRepository.save(newRoom);
  }

  async addCreatorToRoom(room: Room, creator: User): Promise<Room> {
    room.users.push(creator);
    return room;
  }

  async getRoom(id: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async getRoomsForUser(
    userId: number,
    options: IPaginationOptions
  ): Promise<Pagination<Room>> {
    const query = this.roomRepository
      .createQueryBuilder('room')
      .leftJoin('room.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('room.users', 'all_users')
      .orderBy('room.updated_at', 'DESC');

    return paginate(query, options);
  }
}
