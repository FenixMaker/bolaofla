import express from 'express';
import cors from 'cors';
import http from 'http';
import apiRoutes from './routes/api.js';
import { setupScoreSocket } from './sockets/score.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const server = http.createServer(app);

// Configura o WebSocket para atualizações em tempo real
setupScoreSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
