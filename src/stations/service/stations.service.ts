import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OcppClient from 'src/client/OcppClient';
import { StationGateway } from '../gateway/station/station.gateway';
import { CreateOrUpdateStationDto } from '../model/dto/create-update-station.dto';
import { GetStationsFilterDto } from '../model/dto/get-station-filter.dto';
import { Station } from '../model/station.interface';
import { StationRepository } from '../repository/stations.repository';
import { OcppServer } from 'src/server/OcppServer';
import { OcppClientConnection } from 'src/server/OcppClientConnection';
import {
  BootNotificationRequest,
  BootNotificationResponse,
} from 'src/common/Types';
import { OcppError } from 'src/common/OcppError';

@Injectable()
export class StationsService {
  // private _stationGateway = new StationGateway(123);
  // private _stationClient = new ChargePoint();

  constructor(
    @InjectRepository(StationRepository)
    private readonly stationRepository: StationRepository
  ) {}

  async create(createStationDto: CreateOrUpdateStationDto): Promise<Station> {
    const station = await this.stationRepository.createStation(
      createStationDto
    );
    // this.connectStationToCentralSystem(station);
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
    // this._stationGateway.connect();
    // this._stationClient.open();

    this.startOcppClient();
    this.startOcppServer();

    return this.stationRepository.getStations(filterDto);
  }
  async getStationById(id: number): Promise<Station> {
    const station = await this.stationRepository.findOneStation(id);

    if (!station) {
      throw new NotFoundException(`Station ${id} not found`);
    }

    return station;
  }

  startOcppClient() {
    const chargingPointSimple = new OcppClient('CP1111');
    chargingPointSimple.on('error', (err: Error) => {
      console.log(err.message);
    });
    chargingPointSimple.on('close', () => {
      console.log('Connection closed');
    });

    chargingPointSimple.on('connect', async () => {
      const boot: BootNotificationRequest = {
        chargePointVendor: 'eParking',
        chargePointModel: 'NECU-T2',
      };

      try {
        const bootResp: BootNotificationResponse =
          await chargingPointSimple.callRequest('BootNotification', boot);
        if (bootResp.status === 'Accepted') {
          console.log('Bootnotification accepted');
        }
      } catch (e) {
        if (e instanceof Error || e instanceof OcppError) {
          console.error(e.message);
        }
      }
    });
    chargingPointSimple.connect('ws://localhost:3011/');
  }

  startOcppServer() {
    const centralSystemSimple = new OcppServer();
    centralSystemSimple.listen(3011);
    centralSystemSimple.on('connection', (client: OcppClientConnection) => {
      console.log(`Client ${client.getCpId()} connected`);
      client.on('close', (code: number, reason: Buffer) => {
        console.log(
          `Client ${client.getCpId()} closed connection`,
          code,
          reason.toString()
        );
      });

      client.on(
        'BootNotification',
        (
          request: BootNotificationRequest,
          cb: (response: BootNotificationResponse) => void
        ) => {
          const response: BootNotificationResponse = {
            status: 'Accepted',
            currentTime: new Date().toISOString(),
            interval: 60,
          };
          cb(response);
        }
      );
    });
  }
}
