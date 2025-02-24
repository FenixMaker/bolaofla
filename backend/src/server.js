import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import db from './config/db.js';
import apiRoutes from './routes/api.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Configuração do banco de dados
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS palpites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    placar_casa INTEGER NOT NULL,
    placar_visitante INTEGER NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS jogo_atual (
    id INTEGER PRIMARY KEY,
    time_casa TEXT DEFAULT 'Flamengo',
    time_visitante TEXT DEFAULT 'Adversário',
    placar_casa INTEGER DEFAULT 0,
    placar_visitante INTEGER DEFAULT 0,
    tempo TEXT DEFAULT '00:00'
  )`);
});

// Rotas da API
app.use('/api', apiRoutes);

// WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado via WebSocket');

  socket.on('atualizar_placar', (novoPlacar) => {
    db.run(
      'UPDATE jogo_atual SET placar_casa = ?, placar_visitante = ? WHERE id = 1',
      [novoPlacar.home, novoPlacar.away],
      () => {
        io.emit('placar_atualizado', novoPlacar);
      }
    );
  });

  socket.on('atualizar_tempo', (novoTempo) => {
    db.run(
      'UPDATE jogo_atual SET tempo = ? WHERE id = 1',
      [novoTempo],
      () => {
        io.emit('tempo_atualizado', novoTempo);
      }
    );
  });
});

httpServer.listen(3001, () => {
  console.log('Backend rodando na porta 3001');
});