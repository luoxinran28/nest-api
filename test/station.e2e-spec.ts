import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// import { StationsModule } from 'src/stations/stations.module';
import { StationGateway } from 'src/stations/gateway/station/station.gateway';
import ChargePoint from 'src/client/ChargePoint';
import { WsAdapter } from '@nestjs/platform-ws';

describe('Stations Controller', () => {
  let app: INestApplication;
  let stationGateway: StationGateway;
  let stationClient: ChargePoint;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [StationGateway],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useWebSocketAdapter(new WsAdapter(app) as any);
    await app.init();
  });

  it(`Start the Central System and a Station`, () => {
    stationGateway = new StationGateway(123);
    stationClient = new ChargePoint();

    stationGateway.connect();
    stationClient.open();
  });

  it(`Sending data from Central System to Charge Point`, () => {
    const data = 'this is a message from central.';
    stationGateway.send(data);
  });

  it(`Sending data from Charge Point to Central System`, () => {
    const data = 'this is a message from charge point.';
    stationClient.send(data);
  });

  afterAll(async () => {
    await app.close();
  });
});
