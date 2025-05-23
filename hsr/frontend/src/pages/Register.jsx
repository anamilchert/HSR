import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/chat');
  };

  return (
    <div className="register">
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Senha" required />
        <input type="password" placeholder="Confirme sua senha" required />
        <button type="submit">Cadastrar</button>
      </form>
      <a href="/login">Já tem conta? Faça login</a>
    </div>
  );
};

export default RegisterPage;