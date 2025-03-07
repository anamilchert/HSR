HSR - Chatbot de IA

HSR é um chatbot de inteligência artificial desenvolvido em React no frontend e com suporte a APIs de IA no backend. Este projeto visa fornecer uma interface interativa para comunicação com um modelo de IA.

🚀 Tecnologias Utilizadas

React - Framework para construção do frontend

Vite - Ferramenta de build rápida para React

Axios - Para requisições HTTP

Node.js e Express

OpenAI API 

📂 Estrutura do Projeto

HSR/
│── public/                # Arquivos estáticos (favicon, manifest, etc.)
│── src/
│   ├── assets/            # Imagens, ícones e estilos globais
│   ├── components/        # Componentes reutilizáveis
│   ├── pages/             # Páginas principais do app
│   ├── services/          # Arquivos para chamadas de API
│   ├── styles/            # Arquivos CSS
│   ├── App.jsx            # Componente principal da aplicação
│   ├── main.jsx           # Ponto de entrada do React
│── backend/               # Backend em Node.js (se aplicável)
│   ├── server.js          # Servidor Express para comunicação com a IA
│── package.json           # Dependências do projeto
│── vite.config.js         # Configuração do Vite

🔧 Como Rodar o Projeto

1. Clonar o Repositório

git clone https://github.com/seu-usuario/hsr.git
cd hsr

2. Instalar as Dependências

npm install

3. Rodar o Frontend

npm run dev

O projeto estará disponível em http://localhost:5173

4. Rodar o Backend

cd backend
npm install
node server.js

O backend rodará em http://localhost:5000
