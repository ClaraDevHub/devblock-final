# 📄 Mini PRD - DevBlock Tracker

## 1. Visão Geral do Problema
Durante o processo de aprendizado de programação, é comum que desenvolvedores se deparem com erros técnicos ou dúvidas conceituais que interrompem o fluxo de trabalho. Sem uma organização clara, esses "bloqueios" acabam esquecidos ou mal resolvidos. O **DevBlock Tracker** surge para centralizar esses impedimentos, permitindo uma gestão eficiente até a resolução final.

## 2. A Solução
Uma aplicação web robusta que permite o gerenciamento completo (CRUD) de blocos de estudo:
- **Registro:** Cadastro de dúvidas com título, descrição e link de referência.
- **Visualização:** Listagem dinâmica consumindo API REST.
- **Evolução de Estado:** Alteração de status de "Pendente" para "Resolvido".
- **Limpeza:** Remoção de registros que não são mais necessários.

## 3. Público-Alvo
- Estudantes de tecnologia.
- Desenvolvedores que buscam organizar seu histórico de aprendizado e resolução de bugs.

## 4. Requisitos de Experiência do Usuário (UX)
- **Feedback em Tempo Real:** Uso de estados de carregamento (Loading) e mensagens para listas vazias.
- **Tratamento de Erros:** Validação de formulários com mensagens claras para o usuário.
- **Interface Limpa:** Uso de Tailwind CSS para garantir legibilidade e foco nas tarefas.

## 5. Justificativa de UX: Confirmação de Exclusão
Implementamos um alerta de confirmação (`window.confirm`) antes da remoção de qualquer dado. 
* **Justificativa:** Como o projeto lida com links de documentação e descrições de erros que podem ser úteis no futuro, a exclusão acidental causaria frustração e perda de dados. O passo de confirmação garante que a ação seja intencional.

## 6. Restrições e Decisões Técnicas
- **TypeScript:** Tipagem estrita de interfaces (Block) e eventos de formulário para garantir a integridade dos dados.
- **Hooks Avançados:** - `useMemo`: Utilizado para ordenar a lista, garantindo que itens pendentes apareçam sempre no topo sem re-renderizações desnecessárias.
    - `useRef`: Utilizado para manipular o foco do input de título após o envio do formulário.
- **Acessibilidade:** Uso de HTML semântico (`main`, `section`, `header`) e associação correta de labels e inputs.
