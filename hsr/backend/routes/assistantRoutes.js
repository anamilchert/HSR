const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post("/contrato", async (req, res) => {
  try {
    const { nomeCliente, dataContrato, tipoContrato, localizacao } = req.body;

    const prompt = `
Você é o assistente jurídico da HSR.  
Com base nas seguintes informações, gere um contrato formal completo em português:

- Cliente: ${nomeCliente}
- Tipo de contrato: ${tipoContrato}
- Localização: ${localizacao}
- Data: ${dataContrato}

O contrato deve conter: preâmbulo, objeto, obrigações, vigência, valor/pagamento, rescisão, confidencialidade e foro.
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é o assistente jurídico da HSR." },
        { role: "user", content: prompt }
      ]
    });

    const contratoGerado = response.choices[0].message.content;
    res.json({ contratoGerado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao gerar contrato", error });
  }
});

module.exports = router;