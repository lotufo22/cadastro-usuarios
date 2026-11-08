# Cadastro de Usuários

Projeto de estudo: um CRUD de usuários com **API em Node.js/Express** e **front-end em React**, usando **Prisma** com **MongoDB**.

Permite cadastrar, listar e excluir usuários (nome, idade e e-mail) por uma interface web. A API também expõe a edição e a filtragem.

## Tecnologias

**API** (`/api`)
- Node.js + Express 5
- Prisma ORM (6.x)
- MongoDB
- CORS e dotenv

**Front-end** (`/cadastro-usuarios`)
- React 19
- Vite
- Axios
- ESLint

## Estrutura do projeto

```
.
├── api/                    # API REST (Express + Prisma)
│   ├── prisma/
│   │   └── schema.prisma   # modelo User
│   ├── server.js           # rotas e inicialização do servidor
│   └── package.json
└── cadastro-usuarios/      # front-end (React + Vite)
    ├── src/
    │   ├── pages/home/     # tela principal
    │   ├── services/api.js # instância do Axios
    │   └── assets/
    └── package.json
```

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- Um banco MongoDB (local ou no [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. API

```bash
cd api
npm install
```

Crie um arquivo `.env` dentro de `api/` com a string de conexão do seu banco:

```env
DATABASE_URL="mongodb+srv://USUARIO:SENHA@seu-cluster.mongodb.net/nome-do-banco"
```

Gere o client do Prisma, sincronize o schema e inicie o servidor:

```bash
npx prisma generate
npx prisma db push
npx nodemon server.js
```

A API sobe em `http://localhost:3000`.

### 2. Front-end

Em outro terminal:

```bash
cd cadastro-usuarios
npm install
```

Crie um arquivo `.env` dentro de `cadastro-usuarios/`:

```env
VITE_API_URL=http://localhost:3000
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra o endereço que o Vite mostrar no terminal (normalmente `http://localhost:5173`).

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/usuarios` | Lista usuários. Aceita filtros por query string: `name`, `email` e `age` |
| `POST` | `/usuarios` | Cria um usuário |
| `PUT` | `/usuarios/:id` | Atualiza um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário |

Exemplo de corpo para `POST` e `PUT`:

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "age": 25
}
```

## Modelo de dados

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String
  age   Int
}
```

## O que estou aprendendo

- Criar uma API REST com Express e organizar as rotas de um CRUD
- Modelar dados e acessar o MongoDB com Prisma
- Consumir uma API em React com Axios
- Usar variáveis de ambiente (`.env`) no back-end e no front-end
- Separar front-end e back-end em um mesmo repositório
