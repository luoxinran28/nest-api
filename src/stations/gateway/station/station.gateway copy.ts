import * as fs from 'fs';
import WebSocket, { WebSocketServer } from 'ws';
/**
 * Holds and manages the WS communication to the central system
 */
export class StationGateway {
  private _wss: WebSocketServer;
  private promiseResolved = false;

  constructor(readonly id: number) {}

  public get wss() {
    return this._wss;
  }

  public connect(): Promise<void> {
    if (this._wss) {
      throw Error(`WebSocket already established! ${this.id}`);
    }

    return new Promise((resolve, reject) => {
      this._wss = new WebSocketServer({ port: 3011 });
      this._wss.on('connection', (socket) => {
        socket.on('message', (data) => this.onMessage(data));
        socket.on('error', () => this.errorHandler(reject));
        socket.send('The WebSocket Server has connected.');
      });
      resolve();
    });
  }

  public send(data: string): void {
    this._wss.send(data);
  }

  public close(): void {
    this._wss.close();
  }

  private errorHandler(reject: (reason?: any) => void) {
    reject();
  }

  private closeHandler() {
    console.log('Close Handler');
  }

  private onMessage(data: object) {
    console.log('Received data: %s', data);
  }
}
