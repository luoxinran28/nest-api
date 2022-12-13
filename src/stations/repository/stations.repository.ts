import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOrUpdateStationDto } from '../model/dto/create-update-station.dto';
import { GetStationsFilterDto } from '../model/dto/get-station-filter.dto';
import { StationEntity } from '../model/station.entity';
import { Station } from '../model/station.interface';

@Injectable()
export class StationRepository extends Repository<StationEntity> {
  constructor(private dataSource: DataSource) {
    super(StationEntity, dataSource.createEntityManager());
  }

  async createStation(
    createStationDto: CreateOrUpdateStationDto
  ): Promise<StationEntity> {
    const { identity, centralSystemUrl, meterValue, currentChargingPower } =
      createStationDto;

    let latestStation: StationEntity = null;
    if (!identity) {
      latestStation = await this.getLatestStation();
    }

    const station = await this.create(createStationDto);
    station.identity =
      identity ??
      `${process.env.DEFAULT_IDENTITY_NAME}${(latestStation?.id ?? 0) + 1}`;
    station.centralSystemUrl =
      centralSystemUrl ?? `${process.env.DEFAULT_CENTRAL_SYSTEM_URL}`;
    station.meterValue = meterValue ?? 0;
    station.currentChargingPower = currentChargingPower ?? 11000;
    return await this.save(station);
  }

  async updateStation(
    station: Station,
    updateStationDto: CreateOrUpdateStationDto
  ) {
    Object.keys(updateStationDto).forEach((key) => {
      station[key] = updateStationDto[key];
    });
    return await this.save(station);
  }

  async getStations(filterDto: GetStationsFilterDto): Promise<StationEntity[]> {
    const { identity } = filterDto;

    const query = this.createQueryBuilder('station');

    if (identity) {
      query.andWhere('station.identity like :identity', {
        identity: `%${identity}%`,
      });
    }

    const stations = await query.getMany();

    return stations;
  }

  async findOneStation(id: number): Promise<StationEntity> {
    return await this.findOne({ where: { id } });
  }

  async getLatestStation() {
    const query = this.createQueryBuilder('station');
    return await query.orderBy('id', 'DESC').getOne();
  }
}
