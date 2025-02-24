import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

Chart.register(...registerables);

const Estatisticas = () => {
  const [stats, setStats] = useState({ vitorias: 0, empates: 0, derrotas: 0 });

  useEffect(() => {
    axios.get('http://localhost:3001/api/stats')
      .then(res => setStats(res.data));
  }, []);

  const dataResultados = {
    labels: ['Vitórias', 'Empates', 'Derrotas'],
    datasets: [{
      data: [stats.vitorias, stats.empates, stats.derrotas],
      backgroundColor: ['#28a745', '#ffc107', '#dc3545']
    }]
  };

  const dataGols = {
    labels: ['Gols do Flamengo', 'Gols Adversários'],
    datasets: [{
      label: 'Total de Gols',
      data: [stats.gols_pro, stats.gols_contra],
      backgroundColor: ['#007bff', '#6c757d']
    }]
  };

  return (
    <div className="card p-3 mt-4">
      <h4>📊 Estatísticas do Flamengo</h4>
      <div className="row mt-3">
        <div className="col-md-6">
          <Doughnut data={dataResultados} />
          <p className="text-center mt-2">Distribuição de Resultados</p>
        </div>
        <div className="col-md-6">
          <Bar data={dataGols} />
          <p className="text-center mt-2">Comparação de Gols</p>
        </div>
      </div>
    </div>
  );
};

export default Estatisticas;