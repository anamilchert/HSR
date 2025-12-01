const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema({
  nomeCliente: {
    type: String,
    required: true
  },
  dataContrato: {
    type: Date,
    required: true
  },
  tipoContrato: {
    type: String,
    required: true
  },
  localizacao: {
    type: String,
    required: true
  },
    textoGerado: {
    type: String,
    required: true
  },
  threadId: {
    type: String,
    default: null
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Contract", ContractSchema);