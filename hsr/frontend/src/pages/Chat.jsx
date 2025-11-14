import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Chat.css";

const ChatPage = () => {
  const location = useLocation();
  const contratoGerado = location.state?.contratoGerado || null;

  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState([]);
  const [contratos, setContratos] = useState([]);

  // 🔹 Se veio contrato da tela anterior, exibe como primeira mensagem
  useEffect(() => {
    if (contratoGerado) {
      setHistorico([
        { texto: contratoGerado, autor: "Assistente HSR" }
      ]);
    }
  }, [contratoGerado]);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        const res = await fetch("http://localhost:5000/contratos");
        const data = await res.json();
        setContratos(data);
      } catch (error) {
        console.error("Erro ao buscar contratos:", error);
      }
    };
    fetchContratos();
  }, []);

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    setHistorico((prev) => [...prev, { texto: mensagem, autor: "Usuário" }]);
    setMensagem("");
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <h3>📜 Contratos Criados</h3>
        <ul>
          {contratos.map((c) => (
            <li key={c._id}>
              <strong>{c.nomeCliente}</strong>
              <p>{c.tipoContrato}</p>
              <span>{new Date(c.dataContrato).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="chat-main">
        <h2>Chat Jurídico</h2>
        <div className="chat-historico">
          {historico.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.autor === "Usuário" ? "usuario" : "ia"}`}>
              <strong>{msg.autor}:</strong>
              <pre>{msg.texto}</pre>
            </div>
          ))}
        </div>

        <form onSubmit={enviarMensagem} className="chat-form">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
          />
          <button type="submit">Enviar</button>
        </form>
      </main>
    </div>
  );
};

export default ChatPage;