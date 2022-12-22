import React, { useState, useEffect } from 'react';
import { requestData, setToken } from '../utils/api';
import moment from 'moment';
import Header from '../components/Header';

export default function Home() {
  const [user, setUser] = useState({});
  const [birthday, setBirthday] = useState('');

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

      <h1>Home</h1>
      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
      <p>Data de nascimento: {moment(birthday).format('DD/MM/YYYY')}</p>

    </div>
  )
}
