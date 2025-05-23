import React, { useState } from 'react';
import '../styles/Chat.css';

const ChatPage = () => {
  const [mensagem, setMensagem] = useState('');
  const [historico, setHistorico] = useState([]);

  const enviarMensagem = (e) => {
    e.preventDefault();
    setHistorico([...historico, { texto: mensagem, autor: 'Usuário' }]);
    setMensagem('');
    // Aqui você integraria com a API da IA
  };

  return (
    <div className="chat">
      <h2>Chat com a IA</h2>
      <div className="historico">
        {historico.map((msg, idx) => (
          <div key={idx} className={msg.autor === 'Usuário' ? 'usuario' : 'ia'}>
            <strong>{msg.autor}:</strong> {msg.texto}
          </div>
        ))}
      </div>
      <form onSubmit={enviarMensagem}>
        <input 
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem"
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatPage;