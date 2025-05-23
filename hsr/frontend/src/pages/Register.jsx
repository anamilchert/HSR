import React from 'react';
import '../styles/Register.css';

const RegisterPage = () => (
  <div className="register">
    <h2>Cadastro</h2>
    <form>
      <input type="text" placeholder="Nome" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Senha" required />
      <button type="submit">Cadastrar</button>
    </form>
    <a href="/login">Já tem conta? Faça login</a>
  </div>
);

export default RegisterPage;