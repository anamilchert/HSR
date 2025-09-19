const express = require('express');
const Form = require('../models/Form');

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, data } = req.body;

  try {
    const form = new Form({ userId, data });
    await form.save();
    res.status(201).json(form);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar formulário', error });
  }
});

router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const forms = await Form.find({ userId });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar formulários', error });
  }
});

module.exports = router;
