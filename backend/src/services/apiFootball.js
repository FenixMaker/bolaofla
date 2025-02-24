const fetch = require('node-fetch');

// URL base da API gratuita da TheSportsDB (API key "1" é pública)
const API_URL = "https://www.thesportsdb.com/api/v1/json/1";
// ID do Flamengo na TheSportsDB (exemplo: 133602)
const FLAMENGO_TEAM_ID = "133602";

// Função para buscar o próximo jogo do Flamengo
async function getNextMatch() {
  try {
    const response = await fetch(`${API_URL}/eventsnext.php?id=${FLAMENGO_TEAM_ID}`);
    const data = await response.json();
    // data.events é um array dos próximos jogos; usamos o primeiro (mais próximo)
    if (data && data.events && data.events.length > 0) {
      return data.events[0];
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar o próximo jogo:", error);
    return null;
  }
}

// Se desejar também buscar o último jogo, pode criar outra função
async function getLastMatch() {
  try {
    const response = await fetch(`${API_URL}/eventslast.php?id=${FLAMENGO_TEAM_ID}`);
    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      return data.results[0];
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar o último jogo:", error);
    return null;
  }
}

module.exports = {
  getNextMatch,
  getLastMatch,
};
