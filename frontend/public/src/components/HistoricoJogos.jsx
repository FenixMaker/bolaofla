import { useEffect, useState } from 'react';
import axios from 'axios';

const HistoricoJogos = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/historico')
      .then(res => setJogos(res.data));
  }, []);

  return (
    <div className="card p-3 mt-4">
      <h4>📅 Histórico de Jogos</h4>
      <div className="list-group mt-3">
        {jogos.map((jogo) => (
          <div key={jogo.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <span>{jogo.time_casa} vs {jogo.time_visitante}</span>
              <span>
                {jogo.placar_casa} x {jogo.placar_visitante}
                <small className="text-muted ms-2">{new Date(jogo.data_jogo).toLocaleDateString()}</small>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricoJogos;