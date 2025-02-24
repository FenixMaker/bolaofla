import { useState, useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';

const AdminPanel = () => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const socket = useContext(SocketContext);

  const handleUpdate = () => {
    socket.emit('atualizar_placar', {
      home: parseInt(homeScore),
      away: parseInt(awayScore),
    });
  };

  return (
    <div className="card p-3 bg-light">
      <h5 className="text-danger mb-3">⚙️ Painel Admin</h5>
      <div className="row g-2">
        <div className="col">
          <input
            type="number"
            className="form-control"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button onClick={handleUpdate} className="btn btn-warning">
            Atualizar Placar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;