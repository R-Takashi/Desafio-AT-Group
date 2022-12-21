import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestData, setToken } from '../utils/api';
import defaultIcon from '../assets/default-user-icon.jpg';

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

      days === 0 ? setBirthdayCount('Feliz aniversário!') : setBirthdayCount(`Tempo para seu aniversário: ${days} dias`);
    };
    daysToBirthday();
  }, [user.dataDeNascimento]);
  
  return (
    <div>
      <header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        {birthdayCount}
        <img src={ user.avatar? user.avatar : defaultIcon } alt="avatar" width="50px" />
      </header>
    </div>
  )
}
