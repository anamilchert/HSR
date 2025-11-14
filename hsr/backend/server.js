require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoutes');
// const formRoutes = require('./routes/formRoutes');
// const documentRoutes = require('./routes/documentRoutes');
const contractRoutes = require('./routes/contractRoutes');
const assistantRoutes = require('./routes/assistantRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// app.use('/auth', authRoutes);
// app.use('/forms', formRoutes);
// app.use('/documents', documentRoutes);
app.use('/contratos', contractRoutes);
app.use('/assistant', assistantRoutes);
app.use('/clients', clientRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
