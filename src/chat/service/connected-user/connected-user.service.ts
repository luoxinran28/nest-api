import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectedUserEntity } from 'src/chat/model/connected-user/connected-user.entity';
import { ConnectedUser } from 'src/chat/model/connected-user/connected-user.interface';
import { User } from 'src/user/model/user.interface';

import { Repository } from 'typeorm';

@Injectable()
export class ConnectedUserService {
  constructor(
    @InjectRepository(ConnectedUserEntity)
    private readonly connectedUserRepository: Repository<ConnectedUserEntity>
  ) {}

  async create(connectedUser: ConnectedUser): Promise<ConnectedUser> {
    return this.connectedUserRepository.save(connectedUser);
  }

  async findByUser(user: User): Promise<ConnectedUser[]> {
    const userId = user?.id;
    return this.connectedUserRepository.find({ where: { id: userId } });
  }

  async deleteBySocketId(socketId: string) {
    return this.connectedUserRepository.delete({ socketId });
  }

  async deleteAll() {
    await this.connectedUserRepository.createQueryBuilder().delete().execute();
  }
}
