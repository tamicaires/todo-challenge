# Todo Challenge Frontend

Este é o frontend para o projeto Todo Challenge, desenvolvido com Angular 18. O frontend interage com o backend para fornecer uma interface de usuário para autenticação, criação e gerenciamento de tarefas, e designação de usuários a tarefas.

## Tecnologias Utilizadas

- **Angular 18**: Framework para construção da interface de usuário.
- **Angular Standalone Components**: Utilizados para criar componentes independentes.
- **JWT**: Para autorização e controle de acesso.
- **Angular Router**: Para controle de navegação e rotas.
- **TypeScript**: Para adicionar tipagem estática ao JavaScript.

## Funcionalidades

- **Autenticação e Login**: Usuários podem se registrar e fazer login utilizando JWT.
- **Criação de Tarefas**: Usuários podem criar novas tarefas.
- **Gerenciamento de Tarefas**: Usuários podem visualizar, atualizar e excluir tarefas.
- **Designação de Usuários a Tarefas**: Associar usuários a tarefas específicas.
- **Controle de Rotas**: Navegação entre diferentes páginas, com proteção de rotas baseado em autorização JWT.

## Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/todo-challenge-frontend.git
   cd client
   ```
2. Instale as dependencias
   ```bash
   npm install
   
3. Inicie o servidor
   ```bash
   npm start

  ### Funcionalidades de Autorização
O controle de acesso é feito usando JWT. As rotas são protegidas e o acesso a certas páginas é restrito a usuários autenticados. O token JWT é armazenado no localStorage e enviado em cada requisição para o backend.
