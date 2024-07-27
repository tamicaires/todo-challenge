# Todo Challenge Backend

Este é o backend para o projeto Todo Challenge, desenvolvido com TypeScript, Express, Sequelize, PostgreSQL e JWT para autenticação. O projeto inclui funcionalidades para autenticação de usuários, criação e gerenciamento de tarefas, e designação de usuários a tarefas.

## Tecnologias Utilizadas

- **TypeScript**: Para adicionar tipagem estática ao JavaScript.
- **Express**: Framework para construção da API.
- **Sequelize**: ORM para interagir com o banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Para autenticação e autorização de usuários.
- **Swagger**: Para documentação da API.

## Funcionalidades

- **Autenticação e Login**: Usuários podem se registrar e fazer login usando JWT.
- **Criação de Usuários**: Admin pode criar novos usuários.
- **Criação e Gerenciamento de Tarefas**: Usuários podem criar, atualizar e excluir tarefas.
- **Designação de Usuários a Tarefas**: Associar usuários a tarefas específicas.

## Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/todo-challenge.git
   cd todo-challenge
Execute o comando abaixo para instalar as dependências, rodar as migrações do banco de dados e iniciar o servidor:

```npm start ```
Este comando faz o seguinte:

- Instala as dependências do projeto (npm install).
- Compila o código TypeScript (tsc).
- Executa as migrações do banco de dados (sequelize db:migrate).
- Inicia o servidor (tsnd src/http/server).

### O banco de dados Postgres está em armazenamento em nuvem então não é necessário alterar a envs de banco de dados.

Contribuindo
Se você quiser contribuir para este projeto, siga estas etapas:

- Faça um fork do repositório.
- Crie uma nova branch (git checkout -b feature/nova-funcionalidade).
- Faça suas alterações e adicione os arquivos modificados (git add .).
- Faça um commit das suas alterações (git commit -m 'Adiciona nova funcionalidade').
- Faça um push para a branch (git push origin feature/nova-funcionalidade).
- Abra um Pull Request.

### Licença
Este projeto está licenciado sob a MIT License.
