
 import { io } from "socket.io-client";
  let socket = null
  export function connectSocket (token) {
    if (socket && socket.connected)  {
      return socket
    }
    socket = io ('http://localhost:400',{
        auth: {
            token
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 50000,
        reconnectionDelayMax: 10000
    });
    return socket
  }

   export function getSocket () {
    return socket
   }

   export function disconnectSocket() {
     if (socket) {
        socket.disconnect();
        socket = null
     }
   };