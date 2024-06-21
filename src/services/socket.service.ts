export function connectSocket(str: string) {
  const socket = new WebSocket(str);
  socket.onopen;
}
