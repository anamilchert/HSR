import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ContractPage.css";

const ContractPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    clienteId: "",
    dataContrato: "",
    tipoContrato: "",
    localizacao: "",
  });

  const [clientes, setClientes] = useState([]);
  const [mostrarNovoCliente, setMostrarNovoCliente] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: "",
    email: "",
    telefone: "",
    cnpjCpf: "",
    endereco: "",
  });

  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch("http://localhost:5000/clients");
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
      }
    };
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNovoClienteChange = (e) => {
    setNovoCliente({
      ...novoCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleCadastrarCliente = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoCliente),
      });
      const data = await res.json();
      setClientes((prev) => [...prev, data]);
      setFormData({ ...formData, clienteId: data._id });
      setMostrarNovoCliente(false);
      setNovoCliente({ nome: "", email: "", telefone: "", cnpjCpf: "", endereco: "" });
      alert("Cliente cadastrado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar cliente.");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("Criando contrato...");

    try {
      const cliente = clientes.find((c) => c._id === formData.clienteId);

      const resAssist = await fetch("http://localhost:5000/assistant/contrato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomeCliente: cliente?.nome,
          dataContrato: formData.dataContrato,
          tipoContrato: formData.tipoContrato,
          localizacao: formData.localizacao,
        }),
      });

      const dataAssist = await resAssist.json();
      const contratoGerado = dataAssist.contratoGerado;
      const threadId = dataAssist.threadId;

      navigate("/chat", { state: { contratoGerado, threadId } });
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao criar contrato. Tente novamente.");
    }
  };

  return (
    <div className="contract-page">
      <h1>Cadastro de Contrato</h1>

      <form onSubmit={handleSubmit} className="contract-form">
        <label>Cliente</label>
        <div className="cliente-select">
          <select
            name="clienteId"
            value={formData.clienteId}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nome}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setMostrarNovoCliente(!mostrarNovoCliente)}
            className="btn-novo"
          >
            + Novo Cliente
          </button>
        </div>

        {mostrarNovoCliente && (
          <div className="novo-cliente-form">
            <input
              type="text"
              name="nome"
              placeholder="Nome do Cliente"
              value={novoCliente.nome}
              onChange={handleNovoClienteChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={novoCliente.email}
              onChange={handleNovoClienteChange}
            />
            <input
              type="text"
              name="telefone"
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={handleNovoClienteChange}
            />
            <input
              type="text"
              name="cnpjCpf"
              placeholder="CNPJ/CPF"
              value={novoCliente.cnpjCpf}
              onChange={handleNovoClienteChange}
            />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={novoCliente.endereco}
              onChange={handleNovoClienteChange}
            />
            <button onClick={handleCadastrarCliente}>Salvar Cliente</button>
          </div>
        )}

        <label>Data do Contrato</label>
        <input
          type="date"
          name="dataContrato"
          value={formData.dataContrato}
          onChange={handleChange}
          required
        />

        <label>Tipo de Contrato</label>
        <select
          name="tipoContrato"
          value={formData.tipoContrato}
          onChange={handleChange}
          required
        >
          <option value="">Selecione</option>
          <option value="Prestação de Serviços">Prestação de Serviços</option>
          <option value="Parceria Comercial">Parceria Comercial</option>
          <option value="Compra e Venda">Compra e Venda</option>
          <option value="Confidencialidade (NDA)">Confidencialidade (NDA)</option>
          <option value="Transporte de Cargas">Transporte de Cargas</option>
          <option value="Gerenciamento de Riscos">Gerenciamento de Riscos</option>
        </select>

        <label>Localização</label>
        <input
          type="text"
          name="localizacao"
          placeholder="Ex: Joinville - SC"
          value={formData.localizacao}
          onChange={handleChange}
          required
        />

        <button type="submit">Criar Contrato</button>
      </form>

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default ContractPage;
