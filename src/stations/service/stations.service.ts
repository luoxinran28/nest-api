import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StationEntity } from '../model/station.entity';
import { Station } from '../model/station.interface';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(StationEntity)
    private readonly stationRepository: Repository<StationEntity>
  ) {}

  async create(station: Station): Promise<Station> {
    return this.stationRepository.save(station);
  }

  async findOne(id: number): Promise<Station> {
    return this.stationRepository.findOne({ where: { id } });
  }

  async updateOne(id: number, station: Station): Promise<Station> {
    this.stationRepository.update(id, station);
    return await this.findOne(id);
  }

  async deleteOne(id: number): Promise<Station> {
    this.stationRepository.delete(id);
    return await this.findOne(id);
  }
}
