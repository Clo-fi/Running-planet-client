import { Client, IPublishParams, StompHeaders, StompSubscription, messageCallbackType } from '@stomp/stompjs';

export class SocketClient extends Client {
  constructor(accessToken: string) {
    super({
      brokerURL: import.meta.env.VITE_SOCKET_BASE_URL,
      connectHeaders: {
        Authorization: accessToken
      },
      onDisconnect: () => {
        console.log("소켓 연결을 해제합니다.");
      },
      onConnect: () => {
        console.log("소켓 연결에 성공했습니다.");
      },
    });
  }

  publish(params: IPublishParams) {
    super.publish({
      ...params,
      headers: {
        ...params.headers,
        Authorization: this.connectHeaders.Authorization
      }
    })
  }

  subscribe(
    destination: string,
    callback: messageCallbackType,
    headers?: StompHeaders | undefined
  ): StompSubscription {
    return super.subscribe(destination, callback, {
      ...headers,
      Authorization: this.connectHeaders.Authorization
    })

  }
}