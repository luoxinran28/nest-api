import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ChargePoint from 'src/client/ChargePoint';
import { StationGateway } from '../gateway/station/station.gateway';
import { CreateOrUpdateStationDto } from '../model/dto/create-update-station.dto';
import { GetStationsFilterDto } from '../model/dto/get-station-filter.dto';
import { Station } from '../model/station.interface';
import { StationRepository } from '../repository/stations.repository';

@Injectable()
export class StationsService {
  private _stationGateway = new StationGateway(123);
  private _stationClient = new ChargePoint();
  constructor(
    @InjectRepository(StationRepository)
    private readonly stationRepository: StationRepository
  ) {}

  async create(createStationDto: CreateOrUpdateStationDto): Promise<Station> {
    const station = await this.stationRepository.createStation(
      createStationDto
    );
    this.connectStationToCentralSystem(station);
    return station;
  }

  async update(
    id: number,
    updateStationDto: CreateOrUpdateStationDto
  ): Promise<Station> {
    const station = await this.getStationById(id);
    return this.stationRepository.updateStation(station, updateStationDto);
  }

  async getStations(filterDto: GetStationsFilterDto): Promise<Station[]> {
    this._stationGateway.connect();
    this._stationClient.open();
    return this.stationRepository.getStations(filterDto);
  }
  async getStationById(id: number): Promise<Station> {
    const station = await this.stationRepository.findOneStation(id);

    if (!station) {
      throw new NotFoundException(`Station ${id} not found`);
    }

    return station;
  }

  connectStationToCentralSystem(station: Station) {
    // this._stationGateway.connect();
    // const newStationWebSocketClient =
    //   this.stationWebSocketService.createStationWebSocket(station);
    // if (newStationWebSocketClient) {
    //   this.connectedStationsClients.add(newStationWebSocketClient);
    // }
  }
}
