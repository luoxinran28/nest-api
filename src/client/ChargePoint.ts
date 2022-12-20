import { Logger } from '@nestjs/common';
import { WebsocketConnection } from './Connection';
import * as WebSocket from 'ws';

const LOG_NAME = 'ocpp-chargepoint-simulator:simulator:WSConCentralSystem';

export default class ChargePoint {
  private logger = new Logger(ChargePoint.name);
  private _ws: WebSocket;
  private connection: WebsocketConnection | null = null;

  constructor() {
    // this.open();
  }

  public open(): void {
    this._ws = new WebSocket('ws://localhost:3011/stations', 'ocpp1.6');

    this._ws.on('open', () => {
      this._ws.send('A Charge Point has been set up.');
    });

    this._ws.on('message', (msg) => {
      this.connection = new WebsocketConnection(this._ws);
      this.connection.onMessage(msg);
      console.log('Client has received: %s', msg);
    });

    this._ws.on('close', (data) => {
      console.log('The Charge Point is closed.', data);
    });
  }

  public close(): void {
    this._ws.close();
  }

  public send(data: string): void {
    this._ws.send(data);
  }
}
