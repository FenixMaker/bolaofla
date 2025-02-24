import { useState } from 'react';
import axios from 'axios';

const PalpiteForm = () => {
  const [usuario, setUsuario] = useState('');
  const [placarCasa, setPlacarCasa] = useState('');
  const [placarVisitante, setPlacarVisitante] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!usuario || placarCasa < 0 || placarVisitante < 0) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/palpites', {
        usuario,
        placar_casa: parseInt(placarCasa),
        placar_visitante: parseInt(placarVisitante),
      });
      alert('Palpite registrado! 🔥');
      setUsuario('');
      setPlacarCasa('');
      setPlacarVisitante('');
    } catch (error) {
      alert('Erro ao enviar palpite: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h4 className="mb-3">🔮 Registrar Palpite</h4>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Seu nome"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </div>
      <div className="row g-3 mb-3">
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Gols do Fla"
            min="0"
            value={placarCasa}
            onChange={(e) => setPlacarCasa(e.target.value)}
          />
        </div>
        <div className="col-auto align-self-center">x</div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Gols do adversário"
            min="0"
            value={placarVisitante}
            onChange={(e) => setPlacarVisitante(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success">
        Enviar Palpite
      </button>
    </form>
  );
};

export default PalpiteForm;