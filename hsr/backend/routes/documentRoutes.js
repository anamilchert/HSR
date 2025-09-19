const express = require('express');
const Document = require('../models/Document');

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const documents = await Document.find({ userId });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar documentos', error });
  }
});

module.exports = router;
