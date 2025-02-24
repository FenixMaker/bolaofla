
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve('./backend/database.db');

// Retorna os palpites cadastrados
export async function getPalpites(req, res) {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const palpites = JSON.parse(data);
    res.json(palpites);
  } catch (error) {
    console.error("Erro ao ler palpites:", error);
    res.status(500).json({ error: "Erro ao ler os palpites." });
  }
}

// Cadastra um novo palpite
export async function criarPalpite(req, res) {
  try {
    const { nome, placar } = req.body;
    if (!nome || !placar) {
      return res.status(400).json({ error: "Nome e palpite são obrigatórios." });
    }
    const data = await fs.readFile(dbPath, 'utf-8');
    const palpites = JSON.parse(data);
    palpites.push({ nome, placar });
    await fs.writeFile(dbPath, JSON.stringify(palpites, null, 2));
    res.json({ message: "Palpite cadastrado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar palpite:", error);
    res.status(500).json({ error: "Erro ao cadastrar o palpite." });
  }
}
