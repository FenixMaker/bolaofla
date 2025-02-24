import { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [senha, setSenha] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/login', { senha });
      localStorage.setItem('token', res.data.token);
      alert('Login realizado com sucesso!');
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  return (
    <div className="card p-3">
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha Administrativa"
      />
      <button onClick={login} className="btn btn-dark mt-2">
        🔑 Acessar
      </button>
    </div>
  );
};

export default AdminLogin;