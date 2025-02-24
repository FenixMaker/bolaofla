import { WebSocketServer } from 'ws';

export function setupScoreSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log("Cliente conectado via WebSocket.");

    ws.on('message', (message) => {
      console.log("Mensagem recebida:", message);
    });

    ws.on('close', () => {
      console.log("Cliente desconectado.");
    });
  });

  // Função para enviar dados para todos os clientes
  function broadcast(data) {
    wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  }

  return { broadcast };
}
