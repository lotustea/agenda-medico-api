# API de Agendamento medico

Esta é uma API de agendamento que permite aos usuários marcar consultas e gerenciar agendamentos médicos.

## Recursos Principais

- Cadastro de Usuários: permite que os usuários se cadastrem na plataforma fornecendo informações básicas e escolhendo um perfil (médico, secretária ou paciente).
- Agendamento de Consultas: os usuários podem marcar consultas disponíveis com médicos registrados na plataforma.
- Gerenciamento de Agendamentos: os usuários podem visualizar, atualizar e cancelar seus agendamentos existentes.

## Tecnologias Utilizadas
- Node.js
- Express.js
- TypeScript
- MySQL
- TypeORM
- JWT (JSON Web Token)
- bcrypt.js
- Nodemailer
- Docker
- Mailhog
- Postman

## Configuração

Siga as etapas abaixo para configurar e executar a API em seu ambiente local:

1. Clone este repositório em seu computador:

```
git clone git@github.com:lotustea/agenda-medico-api.git
```

2. Instale as dependências do projeto:

```
cd agenda-medico-api

docker compose up -d --build
```

4. Execute as migrações do banco de dados:

```
docker-compose exec app /bin/bash

npx typeorm-ts-node-commonjs migration:run -d src/databases/MysqlDb.ts
```

A API estará em execução em `http://localhost:3333`.

## Mailhog
A interface do Mailhog esta acessivel em `http://localhost:8025/` após iniciar o servidor, para visualizar os emails capturados na aplicacao.

## Documentação da API
A API é documentada usando utilizando JsDoc e collection Postman na raiz do projeto.

## Gerador de cpf - para cadastrar usuarios
`https://www.geradordecpf.org/`
