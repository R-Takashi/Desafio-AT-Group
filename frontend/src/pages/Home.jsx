import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../utils/api';
import defaultIcon from '../assets/default-user-icon.jpg';
import moment from 'moment';

export default function Home() {
  const [user, setUser] = useState({});
  const [birthdayCount, setBirthdayCount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    setToken(token);
    const getUser = async () => {
      const user = await requestData('/user');
      setUser(user);
    }
    getUser();
  }, []);

  useEffect(() => {
    const daysToBirthday = () => {
      const today = new Date();
      const birthday = new Date(user.dataDeNascimento);
      const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
      const days = Math.floor((thisYearBirthday - today) / (1000 * 60 * 60 * 24));

      days === 0 ? setBirthdayCount('Feliz aniversário!') : setBirthdayCount(`Tempo para seu aniversário: ${days + 1} dias`);
    };
    daysToBirthday();
  }, [user.dataDeNascimento]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  console.log(user);
  
  return (
    <div>
      <header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        {birthdayCount}
        <Link to="/profile">
          <img src={ user.avatar? user.avatar : defaultIcon } alt="avatar" width="50px" />
        </Link>
        <button
          type="button"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      <h1>Home</h1>
      <p>Nome: {user.nome}</p>
      <p>Email: {user.email}</p>
      <p>Data de nascimento: {moment(user.dataDeNascimento).format('DD/MM/YYYY')}</p>
    </div>
  )
}
