import WebSocket from 'ws';

const CALL_MESSAGE = 2; // Client-to-Server
const CALLRESULT_MESSAGE = 3; // Server-to-Client
const CALLERROR_MESSAGE = 4; // Server-to-Client

export class WebsocketConnection {
  private pendingCalls: any = {};
  constructor(private socket: WebSocket) {
    // this.socket.on('message', (message) => {
    //   this.onMessage(message.toString());
    // });
  }

  public onMessage(message: string) {
    try {
      const [messageType, ...rest] = JSON.parse(message);
      if (!Array.isArray(rest)) {
        throw new Error('ProtocolError');
      }

      if (messageType === CALL_MESSAGE && rest.length === 3) {
        const [messageId, action, payload] = rest;
        this.onCall(messageId, action, payload);
      } else if (messageType === CALLRESULT_MESSAGE && rest.length === 2) {
        const [messageId, payload] = rest;
        this.onCallResult(messageId, payload);
      } else if (messageType === CALLERROR_MESSAGE && rest.length === 4) {
        const [messageId, errorCode, errorDescription, errorDetails] = rest;
        this.onCallError(messageId, errorCode, errorDescription, errorDetails);
      } else {
        throw new Error('ProtocolError');
      }
    } catch (err) {
      if (err instanceof SyntaxError || err instanceof Error) {
        console.error(err.message);
      }
    }
  }
  private async onCall(messageId: string, request: string, payload: any) {
    const result = JSON.stringify([
      CALLRESULT_MESSAGE,
      messageId,
      request,
      payload,
    ]);
    this.socket.send(result);
  }

  private onCallResult(messageId: string, payload: any) {
    if (this.pendingCalls[messageId]) {
      const { resolve } = this.pendingCalls[messageId];
      if (resolve) {
        resolve(payload);
      }
      delete this.pendingCalls[messageId];
    }
  }

  private onCallError(
    messageId: string,
    errorCode: string,
    errorDescription: string,
    errorDetails: any
  ) {
    if (this.pendingCalls[messageId]) {
      const { reject } = this.pendingCalls[messageId];
      if (reject) {
        // reject(new OcppError(errorCode, errorDescription, errorDetails));
      }
      delete this.pendingCalls[messageId];
    }
  }
}
