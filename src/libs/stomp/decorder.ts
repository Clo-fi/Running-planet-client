import { IMessage } from '@stomp/stompjs';

// 이 부분은 소켓 타입 CHAT 입장시 CHAT 세션 소켓통신
export const SOCKET_TYPE = {
  RUNNING: 'RUNNING',
  RUNNING_END: 'RUNNING_END',

  CHAT: 'CHAT',
  USER: 'USER'
} as const;

interface Socket {
  type: keyof typeof SOCKET_TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

// 이 부분은 소켓통신 값이 바이너리로 올때 디코드해서 utf-8 로 포매팅 후 json return
export const decode = (message: IMessage): Socket => {
  const body = message.binaryBody;
  const decoder = new TextDecoder('utf-8');
  const jsonText = decoder.decode(body);

  return JSON.parse(jsonText);
} 