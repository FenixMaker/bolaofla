import { useEffect, useState, useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';

const Scoreboard = () => {
  const [score, setScore] = useState({ home: 0, away: 0 });
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('placar_atualizado', (newScore) => {
      setScore(newScore);
    });
    return () => socket.off('placar_atualizado');
  }, []);

  return (
    <div className="scoreboard">
      <img src="/escudos/flamengo.svg" alt="Flamengo" />
      <div className="placar">
        <span>{score.home}</span> x <span>{score.away}</span>
      </div>
      <img src="/escudos/adversario.svg" alt="Adversário" />
    </div>
  );
};

export default Scoreboard;