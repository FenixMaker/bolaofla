import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import axios from 'axios';

const PalpitesList = () => {
  const [palpites, setPalpites] = useState([]);
  const [currentScore, setCurrentScore] = useState({ home: 0, away: 0 });
  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchData = async () => {
      const [palpitesRes, scoreRes] = await Promise.all([
        axios.get('http://localhost:3001/api/palpites'),
        axios.get('http://localhost:3001/api/score')
      ]);
      setPalpites(palpitesRes.data);
      setCurrentScore(scoreRes.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('placar_atualizado', (newScore) => {
      setCurrentScore(newScore);
    });
    return () => socket.off('placar_atualizado');
  }, []);

  const calcularDiferenca = (palpite) => {
    return Math.abs(palpite.placar_casa - currentScore.home) + 
           Math.abs(palpite.placar_visitante - currentScore.away);
  };

  const encontrarLider = () => {
    if (palpites.length === 0) return null;
    return palpites.reduce((min, p) => 
      calcularDiferenca(p) < calcularDiferenca(min) ? p : min
    );
  };

  const lider = encontrarLider();

  return (
    <div className="card p-3 mt-4">
      <h4>📋 Palpites dos Participantes</h4>
      <div className="list-group mt-3">
        {palpites.map((palpite) => (
          <div
            key={palpite.id}
            className={`list-group-item ${palpite === lider ? 'border-success border-3' : ''}`}
          >
            <div className="d-flex justify-content-between">
              <span>{palpite.usuario}</span>
              <span>
                {palpite.placar_casa} x {palpite.placar_visitante}
                {palpite === lider && (
                  <span className="badge bg-success ms-2">LÍDER</span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PalpitesList;