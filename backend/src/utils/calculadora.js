export const calcularVencedor = (palpites, placarReal) => {
    return palpites.reduce((vencedorAtual, palpite) => {
      const diffPalpite = Math.abs(palpite.placar_casa - placarReal.home) + 
                          Math.abs(palpite.placar_visitante - placarReal.away);
      const diffAtual = Math.abs(vencedorAtual.placar_casa - placarReal.home) + 
                        Math.abs(vencedorAtual.placar_visitante - placarReal.away);
      return diffPalpite < diffAtual ? palpite : vencedorAtual;
    }, palpites[0]);
  };