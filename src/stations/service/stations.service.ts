import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationEntity } from '../model/station.entity';
import { Station } from '../model/station.interface';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationsRepository: Repository<StationEntity>
  ) {}

  async createStation(station: Station, creator: User): Promise<Room> {
    const newStation = await this.addCreatorToRoom(room, creator);
    return this.roomRepository.save(newRoom);
  }
}
