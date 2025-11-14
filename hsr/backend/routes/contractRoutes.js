const express = require("express");
const router = express.Router();
const Contract = require("../models/Contract");

// GET - listar todos os contratos
router.get("/", async (req, res) => {
  try {
    const contratos = await Contract.find().sort({ criadoEm: -1 });
    res.json(contratos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar contratos", error });
  }
});

// POST - criar novo contrato
router.post("/", async (req, res) => {
  try {
    const { nomeCliente, dataContrato, tipoContrato, localizacao } = req.body;

    if (!nomeCliente || !dataContrato || !tipoContrato || !localizacao) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const novoContrato = new Contract({
      nomeCliente,
      dataContrato,
      tipoContrato,
      localizacao
    });

    await novoContrato.save();
    res.status(201).json(novoContrato);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar contrato", error });
  }
});

module.exports = router;