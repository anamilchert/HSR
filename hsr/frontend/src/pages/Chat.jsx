import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Chat.css";

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const contratoGerado = location.state?.contratoGerado || "";

  const [texto, setTexto] = useState("");
  const [contratoSelecionado, setContratoSelecionado] = useState(false);

  useEffect(() => {
    if (contratoGerado) {
      setTexto(contratoGerado);
      setContratoSelecionado(true);
    }
  }, [contratoGerado]);

  const baixarDocx = async () => {
    const res = await fetch("http://localhost:5000/download/docx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contrato.docx";
    a.click();
  };

  const baixarPdf = async () => {
    const res = await fetch("http://localhost:5000/download/pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contrato.pdf";
    a.click();
  };

  return (
    <div className="chat-container">
      <aside className="sidebar">
        <button
          type="button"
          onClick={() => navigate("/contrato/novo")}
          className="botao-novo-contrato"
        >
          + Novo Contrato
        </button>
      </aside>

      <main className="chat-main">
        <h2>Contrato Editável</h2>

        <textarea
          className="editor-contrato"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          disabled={!contratoSelecionado}
        />

        <div className="botoes-download">
          <button onClick={baixarDocx} disabled={!contratoSelecionado}>
            Baixar DOCX
          </button>
          <button onClick={baixarPdf} disabled={!contratoSelecionado}>
            Baixar PDF
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;