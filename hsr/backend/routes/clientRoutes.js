const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Modelo de Cliente
const ClientSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String },
  telefone: { type: String },
  cnpjCpf: { type: String },
  endereco: { type: String }
});

const Client = mongoose.model("Client", ClientSchema);

// 🔹 Buscar todos os clientes
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ nome: 1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar clientes", error: err });
  }
});

// 🔹 Criar novo cliente
router.post("/", async (req, res) => {
  try {
    const novo = new Client(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ message: "Erro ao cadastrar cliente", error: err });
  }
});

module.exports = router;