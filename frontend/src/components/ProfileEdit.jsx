import React, { useState } from 'react';
import { updateRegister, setToken } from '../utils/api';

export default function ProfileEdit(props) {
  const { nome, avatar } = props;
  const [userUpdate, setUserUpdate] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    setToken(token);

    const success = await updateRegister(userUpdate);

    if (success.message) return setMessage(success.message);

    setMessage(success);
  };

  return (
    <div>
      <form 
        autoComplete='off'
        style={
        { display: "flex", flexDirection: "column", width: "300px", heigth: "300px", border: "1px solid black", padding: "10px"}
      }>
        <label htmlFor="nome">Nome</label>
        <input 
          type="text"
          id="name"
          defaultValue={''}
          autoComplete="off"
          placeholder={ nome }
          onChange={
            (e) => setUserUpdate({ ...userUpdate, nome: e.target.value })
          }
        />

        <label htmlFor="avatar">avatar</label>
        <input 
          type="url" 
          id="avatar"
          defaultValue={''}
          autoComplete="off"
          placeholder={ avatar }
          onChange={
            (e) => setUserUpdate({ ...userUpdate, avatar: e.target.value })
          } 
        />

        <label htmlFor="senha">Senha</label>
        <input 
          type="password" 
          id="password" 
          defaultValue={''}
          autoComplete="new-password"
          onChange={
            (e) => setUserUpdate({ ...userUpdate, senha: e.target.value })
          }
        />

        <button type="button" onClick={ handleSubmit }>Salvar</button>
      </form>

      {message && <div>{message}</div>}
    </div>
  )
}
