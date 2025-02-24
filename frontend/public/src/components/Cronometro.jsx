import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import axios from 'axios';

const Cronometro = () => {
  const [tempo, setTempo] = useState('00:00');
  const [isEditing, setIsEditing] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    axios.get('http://localhost:3001/api/score')
      .then(res => setTempo(res.data.tempo || '00:00'));
  }, []);

  useEffect(() => {
    socket.on('tempo_atualizado', (novoTempo) => {
      setTempo(novoTempo);
    });
    return () => socket.off('tempo_atualizado');
  }, []);

  const handleUpdate = async () => {
    await axios.post('http://localhost:3001/api/update-time', { tempo });
    socket.emit('atualizar_tempo', tempo);
    setIsEditing(false);
  };

  return (
    <div className="card p-3 mb-3">
      <div className="d-flex align-items-center justify-content-between">
        {isEditing ? (
          <>
            <input
              type="text"
              className="form-control me-2"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              pattern="[0-9]{2}:[0-9]{2}"
            />
            <button onClick={handleUpdate} className="btn btn-sm btn-success">
              ✓
            </button>
          </>
        ) : (
          <>
            <span>⏱️ {tempo}</span>
            <button 
              onClick={() => setIsEditing(true)}
              className="btn btn-sm btn-outline-secondary"
            >
              Editar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cronometro;