const { getNextMatch, getLastMatch } = require('../services/apiFootball');

// Exemplo de função para atualizar dados do jogo com informações da API
async function sincronizarJogo(req, res) {
  try {
    // Você pode optar por buscar o próximo jogo ou o último jogo, conforme sua lógica
    const jogo = await getNextMatch();
    if (!jogo) {
      return res.status(404).json({ error: "Nenhum jogo encontrado para o Flamengo." });
    }
    
    // Extraia as informações que deseja:
    const placar = {
      timeCasa: jogo.strHomeTeam,
      timeFora: jogo.strAwayTeam,
      // Caso o placar já tenha sido iniciado ou finalizado, esses campos estarão disponíveis
      golsCasa: jogo.intHomeScore || 0,
      golsFora: jogo.intAwayScore || 0,
      data: jogo.dateEvent,
      horario: jogo.strTime
    };

    // Aqui você pode salvar essas informações no banco de dados ou atualizá-las via WebSocket
    // Por exemplo, supondo que você tenha uma função para atualizar o placar:
    // await atualizarPlacarNoBanco(placar);

    // Para este exemplo, retornamos os dados:
    return res.json({ jogo: placar });
  } catch (error) {
    console.error("Erro na sincronização do jogo:", error);
    return res.status(500).json({ error: "Erro interno ao sincronizar o jogo." });
  }
}

module.exports = {
  sincronizarJogo,
  // ...outros métodos administrativos
};
