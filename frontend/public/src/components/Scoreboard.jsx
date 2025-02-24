import React, { useEffect, useState } from 'react';

function Scoreboard() {
  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    async function fetchJogo() {
      try {
        const response = await fetch('http://localhost:3000/api/sincronizar-jogo');
        const data = await response.json();
        setJogo(data.jogo);
      } catch (error) {
        console.error("Erro ao buscar jogo:", error);
      }
    }
    
    fetchJogo();
    
    // Opcional: configurar um intervalo para atualizar periodicamente
    const interval = setInterval(fetchJogo, 60000); // atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  if (!jogo) return <div>Carregando informações do jogo...</div>;

  return (
    <div className="scoreboard">
      <h2>{jogo.timeCasa} x {jogo.timeFora}</h2>
      <p>{jogo.golsCasa} - {jogo.golsFora}</p>
      <p>{jogo.data} {jogo.horario}</p>
      {/* Exiba os escudos se desejar */}
      <img src="/escudos/flamengo.svg" alt="Flamengo" width="50" />
      <img src="/escudos/adversario.svg" alt="Adversário" width="50" />
    </div>
  );
}

export default Scoreboard;
