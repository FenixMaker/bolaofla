import db from '../config/db.js';

export const atualizarPlacar = (req, res) => {
  const { home, away } = req.body;
  db.run(
    'UPDATE jogo_atual SET placar_casa = ?, placar_visitante = ? WHERE id = 1',
    [home, away],
    (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao atualizar placar' });
      res.json({ success: true });
    }
  );
};

export const finalizarJogo = (req, res) => {
  db.get(
    'SELECT time_casa, time_visitante, placar_casa, placar_visitante FROM jogo_atual',
    (err, jogo) => {
      db.run(
        'INSERT INTO historico_jogos (time_casa, time_visitante, placar_casa, placar_visitante) VALUES (?, ?, ?, ?)',
        [jogo.time_casa, jogo.time_visitante, jogo.placar_casa, jogo.placar_visitante]
      );
      db.run('UPDATE jogo_atual SET placar_casa = 0, placar_visitante = 0, tempo = "00:00"');
      res.json({ success: true });
    }
  );
};