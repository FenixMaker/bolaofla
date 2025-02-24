import { useState } from 'react';

const NotificacoesToggle = () => {
  const [permitido, setPermitido] = useState(Notification.permission === 'granted');

  const solicitarPermissao = async () => {
    const permissao = await Notification.requestPermission();
    setPermitido(permissao === 'granted');
  };

  return (
    <div className="card p-2 mb-3">
      <button 
        onClick={solicitarPermissao}
        className={`btn btn-sm ${permitido ? 'btn-success' : 'btn-outline-secondary'}`}
      >
        {permitido ? '🔔 Notificações Ativas' : '🔕 Ativar Notificações'}
      </button>
    </div>
  );
};

export default NotificacoesToggle;