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
  DataTransferRequest,
  DataTransferResponse,
} from 'src/common/Types';
import { OcppError } from 'src/common/OcppError';

@Injectable()
export class StationsService {
  private _chargingPointSimple: OcppClient;
  constructor(
    @InjectRepository(StationRepository)
    private readonly stationRepository: StationRepository
  ) {
    this.startOcppServer();
  }

  async create(createStationDto: CreateOrUpdateStationDto): Promise<Station> {
    const station = await this.stationRepository.createStation(
      createStationDto
    );
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
    return this.stationRepository.getStations(filterDto);
  }

  async getStationById(id: number): Promise<Station> {
    const station = await this.stationRepository.findOneStation(id);

    if (!station) {
      throw new NotFoundException(`Station ${id} not found`);
    }

    return station;
  }

  // Start Central System Server.
  private startOcppServer() {
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
      client.on(
        'DataTransfer',
        (
          request: DataTransferRequest,
          cb: (response: DataTransferResponse) => void
        ) => {
          const response: DataTransferResponse = {
            status: 'Accepted',
            data: `From Central Server: Start data transfer to charge point ${client.getCpId()}.`,
          };
          cb(response);
        }
      );
    });
  }

  private startChargePoint(id: string): void {
    this._chargingPointSimple = new OcppClient(id);
    this._chargingPointSimple.on('error', (err: Error) => {
      console.log(err.message);
    });
    this._chargingPointSimple.on('close', () => {
      console.log('Connection closed');
    });

    this._chargingPointSimple.on('connect', async () => {
      const boot: BootNotificationRequest = {
        chargePointVendor: 'eParking',
        chargePointModel: 'NECU-T2',
      };

      try {
        const bootResp: BootNotificationResponse =
          await this._chargingPointSimple.callRequest('BootNotification', boot);
        if (bootResp.status === 'Accepted') {
          console.log('Bootnotification accepted');
        }
      } catch (e) {
        if (e instanceof Error || e instanceof OcppError) {
          console.error(e.message);
        }
      }
    });
    this._chargingPointSimple.connect('ws://localhost:3011/');
  }

  public async commandChargePointById(
    id: string,
    command: string
  ): Promise<void> {
    if (!id) {
      console.log(
        'Please tell me which Charge Point you are assigning command to.'
      );
      return;
    }
    if (!this._chargingPointSimple) {
      // Test 1: start a charge point
      this.startChargePoint(id);
    }
    if (command === 'testcommand') {
      // Test 2: Data transfer
      const dataTransferReq: DataTransferRequest = {
        vendorId: 'vendor id',
        data: `Hi. this is Charge Point ${id}`,
      };
      try {
        const dataTransferResp: DataTransferResponse =
          await this._chargingPointSimple.callRequest(
            'DataTransfer',
            dataTransferReq
          );
        if (dataTransferResp.status === 'Accepted') {
          console.log('Getting data from central server:');
          console.log(dataTransferResp.data);
          // Test 3: Get configuration
          this._chargingPointSimple.emit('GetConfiguration');
        }
      } catch (e) {
        if (e instanceof Error || e instanceof OcppError) {
          console.error(e.message);
        }
      }
    }
  }
}
