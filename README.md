# HSR - Chatbot de IA 

HSR é um chatbot de inteligência artificial desenvolvido em React no frontend e com suporte a APIs de IA no backend. Este projeto visa fornecer uma interface interativa para comunicação com um modelo de IA.


🚀 ***Tecnologias Utilizadas***

React - Framework para construção do frontend

Vite - Ferramenta de build rápida para React

Axios - Para requisições HTTP

Node.js e Express

OpenAI API 


🔧 ***Como Rodar o Projeto***

**1. Clonar o Repositório**

cd hsr

**2. Instalar as Dependências**

npm install

**3. Rodar o Frontend**

cd hsr > cd src > npm run dev

O projeto estará disponível em http://localhost:5173

**4. Rodar o Backend**

- cd backend
- npm install
- node server.js

O backend rodará em http://localhost:5000


****Requisitos Funcionais (RF)****
- RF01 - Interface de Chat: O sistema deve permitir que o usuário envie mensagens de texto para o chatbot por meio de uma interface interativa.

- RF02 - Respostas da IA: O sistema deve exibir as respostas do modelo de IA em tempo real após o envio da mensagem pelo usuário.

- RF03 - Integração com API de IA: O backend deve se comunicar com uma API de modelo de IA (como OpenAI, por exemplo) para processar as mensagens do usuário e retornar as respostas.

- RF04 - Histórico de Conversas: O sistema deve armazenar e exibir o histórico da conversa durante a sessão atual do usuário.

- RF05 - Limpeza do Chat: O sistema deve permitir que o usuário limpe o histórico da conversa atual.

- RF06 - Detecção de Erros: O sistema deve informar ao usuário caso ocorra um erro de conexão com a API de IA ou falha de resposta.

- RF07 - Responsividade: A interface deve se adaptar a diferentes tamanhos de tela (desktop, tablet, mobile).

****Requisitos Não Funcionais (RNF)****

- RNF01 - Desempenho: O sistema deve responder às mensagens do usuário em até 3 segundos em condições normais de rede.

- RNF02 - Escalabilidade: O backend deve estar preparado para escalabilidade horizontal em caso de aumento de usuários simultâneos.

- RNF03 - Segurança: As requisições para a API de IA devem ser autenticadas e protegidas contra acessos indevidos. O sistema não deve armazenar informações sensíveis do usuário sem consentimento.

- RNF04 - Usabilidade: A interface deve ser intuitiva, com design acessível e fácil navegação.

- RNF05 - Manutenibilidade: O código deve ser modular e documentado para facilitar atualizações e manutenção.

- RNF06 - Disponibilidade: O sistema deve estar disponível 99% do tempo, com exceção de períodos programados de manutenção.

***Arquitetura Escolhida: Monolítica Estruturada***
Justificativa da escolha:
- Simplicidade: Ideal para MVPs e projetos em fase inicial.
- Fácil manutenção: Um único backend, um único deploy.
- Desempenho: Sem sobrecarga de comunicação entre serviços via rede.
- Baixo custo: Menos infraestrutura envolvida.
- Atende totalmente aos RF e RNF: Toda lógica está concentrada e pode ser modularizada dentro do mesmo app.
