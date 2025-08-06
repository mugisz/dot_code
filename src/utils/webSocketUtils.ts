export const createWebSocket = (
  wsUrl: string,
  op: string,
  onMessage: (event: MessageEvent) => void,
  onError: (error: Event) => void
): WebSocket => {
  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    ws.send(JSON.stringify({ op }));
  };

  ws.onmessage = onMessage;
  ws.onerror = onError;

  return ws;
};

export const closeWebSocket = (ws: WebSocket | null): void => {
  if (ws) {
    ws.close();
  }
};
