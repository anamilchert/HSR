import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Chat.css";

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const contratoGerado = location.state?.contratoGerado || null;
  const threadIdInicial = location.state?.threadId || null;

  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const [threadId, setThreadId] = useState(null);

  useEffect(() => {
    if (contratoGerado) {
      setHistorico([{ texto: contratoGerado, autor: "Assistente HSR" }]);
      setContratoSelecionado(true);
      setThreadId(threadIdInicial);
    }
  }, [contratoGerado, threadIdInicial]);

  useEffect(() => {
    const fetchContratos = async () => {
      const res = await fetch("http://localhost:5000/contratos");
      const data = await res.json();
      setContratos(data);
    };
    fetchContratos();
  }, []);

  const selecionarContrato = (contrato) => {
    setContratoSelecionado(contrato);
    setThreadId(contrato.threadId || null);
    setHistorico([
      {
        texto: contrato.textoGerado || "Contrato selecionado.",
        autor: "Assistente HSR",
      },
    ]);
  };

  const enviarMensagem = async (e) => {
    e.preventDefault();

    if (!contratoSelecionado) return;
    if (!mensagem.trim()) return;

    const novaMensagem = mensagem;

    setHistorico((prev) => [...prev, { texto: novaMensagem, autor: "Usuário" }]);
    setMensagem("");

    const res = await fetch("http://localhost:5000/assistant/alterar-contrato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mensagem: novaMensagem,
        threadId,
      }),
    });

    const data = await res.json();

    setThreadId(data.threadId);

    setHistorico((prev) => [
      ...prev,
      { texto: data.contratoAtualizado, autor: "Assistente HSR" },
    ]);
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <button
          type="button"
          onClick={() => navigate("/contrato")}
          className="botao-novo-contrato"
        >
          + Novo Contrato
        </button>

        <h3>Contratos</h3>

        <ul className="lista-contratos">
          {contratos.map((c) => (
            <li key={c._id} onClick={() => selecionarContrato(c)}>
              <strong>{c.nomeCliente}</strong>
              <p>{c.tipoContrato}</p>
              <span>{new Date(c.dataContrato).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="chat-main">
        <h2>Assistente Jurídico HSR</h2>

        <div className="chat-historico">
          {historico.map((msg, idx) => (
            <div
              key={idx}
              className={`msg ${msg.autor === "Usuário" ? "usuario" : "ia"}`}
            >
              <strong>{msg.autor}:</strong>
              <pre>{msg.texto}</pre>
            </div>
          ))}
        </div>

        <form onSubmit={enviarMensagem} className="chat-form">
          <input
            type="text"
            placeholder={
              contratoSelecionado
                ? "Digite sua solicitação de alteração..."
                : "Selecione um contrato antes de enviar mensagens"
            }
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            disabled={!contratoSelecionado}
          />

          <button type="submit" disabled={!contratoSelecionado}>
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChatPage;