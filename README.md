# Products Backend API

API RESTful para gerenciamento de produtos e clientes desenvolvida com Node.js, TypeScript, Express e SQLite seguindo arquitetura MVC.

## ✅ Checklist do Teste Técnico

- [x] Criar uma **API em Node.js** usando Express
- [x] Utilizar **SQLite** como banco de dados
- [x] Criar duas tabelas no banco:
  - **produtos** → id, nome, preço, estoque, data de criação
  - **clientes** → id, nome, email, data de criação
- [x] Implementar rotas de **cadastro**:
  - `POST /api/produtos` → cadastrar produto
  - `POST /api/clientes` → cadastrar cliente
- [x] Implementar rotas de **consulta**:
  - `GET /api/produtos` → listar produtos (com paginação e busca)
  - `GET /api/produtos/:id` → buscar produto por ID
  - `GET /api/clientes` → listar clientes (com paginação e busca)
  - `GET /api/clientes/:id` → buscar cliente por ID
- [x] Regras de **validação**:
  - Produto deve ter nome e preço obrigatórios
  - Cliente deve ter nome e email obrigatórios
  - Email de cliente deve ser **único**
- [x] Entregar junto instruções claras de como rodar a API

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Teste com uma interface em production

Para melhor atender as necessidades de teste eu deixarei disponível uma aplicação já feita deploy para quem tiver interesse testar em produção:
(https://storeappfortest.netlify.app/produtos)[StoreApp]

### Instalação Local

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd products-backend-api

# Instale as dependências
npm install

# Inicialize o banco de dados
npm run init-db

# Compile o TypeScript
npm run build

# Inicie o servidor
npm start
```

### Desenvolvimento

```bash
# Modo desenvolvimento com ts-node-dev (recomendado)
npm run dev

# Modo desenvolvimento com nodemon (alternativo)
npm run dev:nodemon

# Executar linting
npm run lint

# Corrigir problemas de linting
npm run lint:fix
```

### Deploy em Produção

#### Render.com (Recomendado)

A API está configurada para deploy automático no Render:

```bash
# 1. Faça commit do código
git add .
git commit -m "Deploy para produção"
git push origin main

# 2. No Render Dashboard:
# - Conecte seu repositório
# - O arquivo render.yaml configurará tudo automaticamente
```

📖 **Guia completo**: [docs/DEPLOY.md](docs/DEPLOY.md)

#### Docker (Opcional)

```bash
# Build da imagem
docker build -t products-backend-api .

# Executar container
docker run -p 3000:3000 products-backend-api
```

## 🏗️ Estrutura do Projeto

```
src/
├── controllers/          # Controladores (lógica de negócio)
│   ├── ClientController.ts
│   └── ProductController.ts
├── database/            # Configuração do banco de dados
│   ├── connection.ts
│   └── init.ts
├── middleware/          # Middlewares da aplicação
│   ├── errorHandler.ts
│   └── validation.ts
├── models/              # Modelos de dados
│   ├── Client.ts
│   └── Product.ts
├── routes/              # Definição das rotas
│   ├── clientRoutes.ts
│   ├── index.ts
│   └── productRoutes.ts
├── types/               # Definições de tipos TypeScript
│   └── index.ts
├── app.ts              # Configuração do Express
└── server.ts           # Ponto de entrada da aplicação
```

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### Health Check
- **GET** `/health` - Verificar status da API

#### Produtos

- **POST** `/produtos` - Criar produto
- **GET** `/produtos` - Listar produtos
- **GET** `/produtos/:id` - Buscar produto por ID
- **PUT** `/produtos/:id` - Atualizar produto
- **DELETE** `/produtos/:id` - Remover produto

#### Clientes

- **POST** `/clientes` - Criar cliente
- **GET** `/clientes` - Listar clientes
- **GET** `/clientes/:id` - Buscar cliente por ID
- **PUT** `/clientes/:id` - Atualizar cliente
- **DELETE** `/clientes/:id` - Remover cliente

### Parâmetros de Consulta

Para as rotas de listagem (`GET /produtos` e `GET /clientes`):

- `page` (opcional): Número da página (padrão: 1)
- `limit` (opcional): Itens por página (padrão: 10, máximo: 100)
- `search` (opcional): Termo de busca

### Exemplos de Uso

#### Criar Produto
```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Smartphone",
    "preco": 899.99,
    "estoque": 50
  }'
```

#### Criar Cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com"
  }'
```

#### Listar Produtos com Paginação
```bash
curl "http://localhost:3000/api/produtos?page=1&limit=5&search=smartphone"
```

### Respostas da API

Todas as respostas seguem o padrão:

```typescript
{
  "success": boolean,
  "data"?: any,
  "message"?: string,
  "error"?: string
}
```

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web
- **SQLite3** - Banco de dados
- **Express Validator** - Validação de dados
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing

## 📁 Banco de Dados

### Estrutura das Tabelas

#### Tabela `produtos`
```sql
CREATE TABLE produtos (
  id TEXT PRIMARY KEY,  -- UUID v4
  nome TEXT NOT NULL,
  preco REAL NOT NULL,
  estoque INTEGER NOT NULL,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabela `clientes`
```sql
CREATE TABLE clientes (
  id TEXT PRIMARY KEY,  -- UUID v4
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Validações

### Produtos
- `id`: UUID v4 (gerado automaticamente)
- `nome`: obrigatório, 1-255 caracteres
- `preco`: obrigatório, número positivo
- `estoque`: obrigatório, número inteiro não negativo

### Clientes
- `id`: UUID v4 (gerado automaticamente)
- `nome`: obrigatório, 1-255 caracteres
- `email`: obrigatório, formato válido, único no sistema

## 🚨 Tratamento de Erros

A API implementa tratamento robusto de erros:

- **400** - Dados inválidos
- **404** - Recurso não encontrado
- **409** - Conflito (email duplicado)
- **500** - Erro interno do servidor

## 📋 Scripts Disponíveis

- `npm run build` - Compilar TypeScript
- `npm start` - Iniciar servidor (produção)
- `npm run dev` - Iniciar servidor (desenvolvimento)
- `npm run init-db` - Inicializar banco de dados
- `npm run lint` - Executar linting
- `npm run lint:fix` - Corrigir problemas de linting
- `npm run render-build` - Build para deploy no Render
- `npm run clean` - Limpar cache e reinstalar dependências
- `npm run dev:nodemon` - Desenvolvimento com nodemon
