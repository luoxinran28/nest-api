import { Injectable } from '@nestjs/common';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Message } from 'src/chat/model/message/message.interface';
import { Room } from 'src/chat/model/room/room.interface';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: Repository<Message>) {}

  async create(message: Message): Promise<Message> {
    return this.messageRepository.save(this.messageRepository.create(message));
  }

  async findMessagesForRoom(
    room: Room,
    options: IPaginationOptions
  ): Promise<Pagination<Message>> {
    const query = this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.room', 'room')
      .where('room.id = :roomId', { roomId: room.id })
      .leftJoinAndSelect('message.user', 'user')
      .orderBy('message.created_at', 'DESC');
    return paginate(query, options);
  }
}
