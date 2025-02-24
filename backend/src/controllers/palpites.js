import db from '../config/db.js';

export const cadastrarPalpite = (req, res) => {
  const { usuario, placar_casa, placar_visitante } = req.body;
  db.run(
    'INSERT INTO palpites (usuario, placar_casa, placar_visitante) VALUES (?, ?, ?)',
    [usuario, placar_casa, placar_visitante],
    (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao cadastrar palpite' });
      res.json({ success: true });
    }
  );
};

export const listarPalpites = (req, res) => {
  db.all('SELECT * FROM palpites', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao listar palpites' });
    res.json(rows);
  });
};