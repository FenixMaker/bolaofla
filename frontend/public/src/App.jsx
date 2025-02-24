import { SocketContext, socket } from './contexts/SocketContext';
import Scoreboard from './components/Scoreboard';
import PalpiteForm from './components/PalpiteForm';
import PalpitesList from './components/PalpitesList';
import Cronometro from './components/Cronometro';
import AdminPanel from './components/AdminPanel';
import HistoricoJogos from './components/HistoricoJogos';
import Estatisticas from './components/Estatisticas';
import NotificacoesToggle from './components/NotificacoesToggle';
import SincronizadorJogo from './components/SincronizadorJogo';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <div className="container py-4">
        <h1 className="text-center mb-4">
          <img src="/escudos/flamengo.svg" width="40" alt="Flamengo" />
          BOLÃO FLA DEEPSEEK
          <img src="/escudos/adversario.svg" width="40" alt="Adversário" />
        </h1>
        
        <Cronometro />
        <Scoreboard />
        
        <div className="row mt-4">
          <div className="col-md-6">
            <PalpiteForm />
            <PalpitesList />
          </div>
          <div className="col-md-6">
            <AdminPanel />
            <SincronizadorJogo />
            <NotificacoesToggle />
          </div>
        </div>

        <HistoricoJogos />
        <Estatisticas />
      </div>
    </SocketContext.Provider>
  );
}

export default App;