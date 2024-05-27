// import { Client } from '@stomp/stompjs';
// import { createContext, useEffect, useState } from 'react';
// import { Cookies } from 'react-cookie';
// import { Outlet } from 'react-router-dom';
// import { SocketClient } from './SocketClient';

// export const WebSocketContext = createContext<null | Client>(null);

// export const WebSocketProvider = () => {
//   const [client, setClient] = useState<null | Client>(null);

//   useEffect(() => {
//     const cookies = new Cookies(['Authorization']);
//     const Authorization = cookies.get('Authorization');
//     const stompClient = new SocketClient(Authorization);

//     stompClient.activate();
//     setClient(stompClient);

//     return () => {
//       stompClient.deactivate
//     }

//   })
// }