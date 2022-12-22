import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProfileEdit from '../components/ProfileEdit';
import { requestData, setToken } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Profile() {
  const [user, setUser] = useState({});
  const [birthday, setBirthday] = useState('');
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    setToken(token);
    const getUser = async () => {
      const user = await requestData('/user');
      setUser(user);
      const birthdayUser = new Date(user.dataDeNascimento);
      setBirthday(birthdayUser.setDate(birthdayUser.getDate() + 1));
    }
    getUser();
  }, []);

  return (
    <div>
      <Header />
      <h1>Profile</h1>

      {
        !edit ? (
          <div>
            <p>Nome: { user.nome }</p>
            <p>Email: { user.email }</p>
            <p>Data de nascimento: {moment(birthday).format('DD/MM/YYYY')}</p>
          </div> ) : <ProfileEdit nome={ user.nome } avatar={ user.avatar } />
      }

      <button type="button" onClick={() => setEdit(!edit)}>
        { edit ? 'Cancelar' : 'Editar' }
      </button>

      <button type="button" onClick={() => navigate('/home')}>
        Voltar
      </button>
    </div>
  )
}
