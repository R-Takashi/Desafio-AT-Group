import React from 'react'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailRegex.test(email)) setError('Email não é válido');

    if (password.length < 6) setError('Senha deve ter no mínimo 6 caracteres');
  }

  return (
    <div>
      <h1>Login</h1>

      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="button"
            onClick={handleSubmit}
          >
            Login
          </button>

        </div>

          {error && <div>{error}</div>}

          <div>
            <a href="/register">Register</a>
          </div>

      </form>

    </div>
  )
}
