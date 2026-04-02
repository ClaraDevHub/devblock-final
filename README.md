# 🚀 DevBlock Tracker

O **DevBlock Tracker** é uma solução para gerenciamento de fluxo de trabalho de desenvolvedores, permitindo o controle de tarefas, estados de progresso e persistência de dados via API REST.

## 🛠️ Tecnologias
- **React** (Componentes Funcionais)
- **TypeScript** (Tipagem Estrita)
- **Tailwind CSS** (Estilização Semântica)
- **Axios** (Consumo de API)

## 📖 Funcionalidades (Requisitos Atendidos)
- **Leitura (GET):** Listagem automática com estados de Loading e Empty State.
- **Criação (POST):** Formulário tipado com atualização de lista sem Refresh (Optimistic UI).
- **Atualização (PATCH/PUT):** Alteração de status da tarefa com persistência imediata.
- **Remoção (DELETE):** Exclusão de registros com **confirmação prévia**.
  - *Justificativa:* Optamos por um modal de confirmação para evitar cliques acidentais que resultem em perda de dados críticos do usuário.

## 🚀 Como rodar localmente
1. Clone o repositório: `git clone https://github.com/ClaraDevHub/devblock-web.git`
2. Instale as dependências: `npm install`
3. Inicie o projeto: `npm run dev`

## 📄 Mini PRD
O documento de requisitos completo encontra-se no arquivo [PRD.md](./PRD.md).
