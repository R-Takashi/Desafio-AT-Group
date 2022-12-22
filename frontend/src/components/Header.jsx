import React, { useState, useEffect } from 'react';
import { requestData, setToken } from '../utils/api';
import defaultIcon from '../assets/default-user-icon.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
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
      const thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate() + 1);
      const days = Math.floor((thisYearBirthday - today) / (1000 * 60 * 60 * 24));

      if (days === -1) return setBirthdayCount('Feliz aniversário!');

      if (days === 0) return setBirthdayCount('Tempo para seu aniversário: 1 dia');

      return days < -1 ? setBirthdayCount(`Tempo para seu aniversário: ${days + 365} dias`) : 
        setBirthdayCount(`Tempo para seu aniversário: ${days + 1} dias`);
    };
    daysToBirthday();
  }, [user.dataDeNascimento]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      { birthdayCount }

      <Link to="/profile">
        <img src={ user.avatar? user.avatar : defaultIcon } alt="avatar" style={
          { width: "50px", height: "50px", borderRadius: "50%" }
        } />
      </Link>

      <button
        type="button"
        onClick={ logout }
      >
        Logout
      </button>

  </header>
  )
}
