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

  public connect() {
    if (this._wss) {
      throw Error(`WebSocket already established! ${this.id}`);
    }

    this._wss = new WebSocketServer({ port: 3011 });

    this._wss.on('connection', (ws) => {
      ws.on('message', (data) => this.onMessage(data));
      ws.on('error', () => this.errorHandler());
      ws.send('The WebSocket Server has connected.');
    });
  }

  public send(data: string): void {
    // log.debug(LOG_NAME, this.config.cpName, `send[${this.id}]: ${data}`);
    // this._ws.send(data);
  }

  public close(): void {
    // if (this._ws.readyState === WebSocket.OPEN) {
    //   log.debug(LOG_NAME, this.config.cpName, `Close requested. [${this.id}]`);
    //   this._ws.close();
    // } else {
    //   log.debug(LOG_NAME, this.config.cpName, `Close requested but WS was not open. [${this.id}]`);
    // }
  }

  // private onConnection(ws) {
  //   this._ws.on('message', (data) => this.messageHandler(data));
  // }

  private errorHandler() {
    // return (event) => {
    //   log.debug(LOG_NAME, this.config.cpName, `Backend WS error received. ${this.config.url}, Error: ${event}`);
    //   if (!this.promiseResolved) {
    //     reject(event);
    //   } else {
    //     this.sendErrorMsgRemoteConsole(event);
    //   }
    // };
  }

  private closeHandler() {
    console.log('Close Handler');
    // return () => {
    //   log.debug(LOG_NAME, this.config.cpName, `Backend WS closed. ${this.config.url}`);
    //   this.failSafeConnectionAdapter.onClose();
    //   this.sendCloseMsgRemoteConsole();
    // };
  }

  private onMessage(data: object) {
    console.log('Received data: %s', data);
    // return (data: string) => {
    //   log.debug(LOG_NAME, this.config.cpName, `received[${this.id}]: ${data}`);
    //   this.failSafeConnectionAdapter.onMessage(JSON.parse(data));
    // };
  }

  private openHandler() {
    // console.log('Open handler');
    // this._ws.send('The connection has been open.');
    // return () => {
    //   log.debug(LOG_NAME, this.config.cpName, `Backend WS opened. ${this.config.url}`);
    //   this.sendOpenMsgRemoteConsole();
    //   resolve();
    //   this.promiseResolved = true;
    // };
  }

  // private sendErrorMsgRemoteConsole(event) {
  //   this.sendMsgRemoteConsole(RemoteConsoleTransmissionType.WS_ERROR, event);
  // }

  // private sendCloseMsgRemoteConsole() {
  //   this.sendMsgRemoteConsole(RemoteConsoleTransmissionType.WS_STATUS, {
  //     id: this.id,
  //     description: "closed."
  //   });
  // }

  // private sendOpenMsgRemoteConsole() {
  //   this.sendMsgRemoteConsole(RemoteConsoleTransmissionType.WS_STATUS, {
  //     id: this.id,
  //     description: `open (${this.config.url})`
  //   });
  // }

  // private sendMsgRemoteConsole(type: RemoteConsoleTransmissionType, payload: string | object) {
  //   const wsConRemoteConsoleArr = wsConRemoteConsoleRepository.get(this.config.cpName);
  //   wsConRemoteConsoleArr.forEach(wsConRemoteConsole => {
  //     wsConRemoteConsole.add(type, payload);
  //   });
  // }

  private setTlsOptions(): WebSocket.ClientOptions {
    // const options = {} as WebSocket.ClientOptions;
    // if (this.config.url.startsWith('wss://')) {
    //   log.debug(LOG_NAME, this.config.cpName, `Secure connection detected: ${this.config.url}`);
    //   const keyStoreElement = this.config.keyStore.get();
    //   log.debug(LOG_NAME, this.config.cpName, `Using files: ${JSON.stringify(keyStoreElement)}`);
    //   if (keyStoreElement) {
    //     options.key = fs.readFileSync(keyStoreElement.key);
    //     options.cert = fs.readFileSync(keyStoreElement.cert);
    //   }
    // }
    // return options;
  }
}
