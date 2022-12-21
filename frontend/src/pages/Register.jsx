import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestSignup, setToken } from '../utils/api';

const style = {
  display: "flex",
  flexDirection: "column",
  width: "300px",
  heigth: "300px",
  border: "1px solid black",
  padding: "10px",
}

export default function Register() {
  const [register, setRegister] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const success = await requestSignup(register);

    console.log(success);

    if (success.message) return setError(success.message);

    setToken(success.token);

    localStorage.setItem('token', success.token);

    return navigate('/home');
  }

  return (
    <div>
      <h1>Register</h1>

      <form>
        <div style={ style }>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setRegister({ ...register, nome: e.target.value })}
          />
          
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setRegister({ ...register, email: e.target.value })}
          />
          
          <label htmlFor="password">Senha</label>

          <input
            type="password"
            id="password"
            onChange={(e) => setRegister({ ...register, senha: e.target.value })}
          />

          <label htmlFor="bornDate">Data de Nascimento</label>

          <input
            type="date"
            id="bornDate"
            onChange={(e) => setRegister({ ...register, dataDeNascimento: new Date(e.target.value) })}
          />

          <button 
            type="button"
            onClick={ handleSubmit }
          >
            Cadastrar
          </button>
        </div>
      </form>

      {error && <div>{error}</div>}

    </div>
  )
}
