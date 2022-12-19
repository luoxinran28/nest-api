import * as WebSocket from 'ws';

export default class WSClient {
  private _ws: WebSocket;
  constructor() {
    // this.open();
  }

  public open(): void {
    this._ws = new WebSocket('ws://localhost:3011/stations', 'ocpp1.6');

    this._ws.on('open', () => {
      this._ws.send('Sending something from client.');
    });

    this._ws.on('message', (data) => {
      console.log('Client has received: %s', data);
    });
  }
}
