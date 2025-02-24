import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import axios from 'axios';

const SincronizadorJogo = () => {
  const socket = useContext(SocketContext);

  const handleSincronizar = async () => {
    try {
      await axios.get('http://localhost:3001/api/sincronizar-jogo');
      socket.emit('recarregar_dados');
    } catch (error) {
      alert('Erro ao sincronizar: ' + error.message);
    }
  };

  return (
    <div className="card p-3 mb-3">
      <button 
        onClick={handleSincronizar}
        className="btn btn-info"
      >
        🔄 Sincronizar com Próximo Jogo
      </button>
    </div>
  );
};

export default SincronizadorJogo;