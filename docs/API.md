# Documentação da API

## Base URL
```
http://localhost:3000/api
```

## Autenticação
Esta API não implementa autenticação para simplificar o teste técnico.

## Formato das Respostas

Todas as respostas seguem o padrão:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string
}
```

## Endpoints

### Health Check

#### GET /health
Verifica o status da API.

**Resposta:**
```json
{
  "success": true,
  "message": "API funcionando corretamente",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## Produtos

### POST /produtos
Cria um novo produto.

**Body:**
```json
{
  "nome": "string",
  "preco": number,
  "estoque": number
}
```

**Validações:**
- `nome`: obrigatório, 1-255 caracteres
- `preco`: obrigatório, número positivo
- `estoque`: obrigatório, inteiro não negativo

**Resposta (201):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Smartphone",
    "preco": 899.99,
    "estoque": 50,
    "data_criacao": "2024-01-01T12:00:00.000Z"
  },
  "message": "Produto criado com sucesso"
}
```

### GET /produtos
Lista produtos com paginação e busca.

**Query Parameters:**
- `page` (opcional): número da página (padrão: 1)
- `limit` (opcional): itens por página (padrão: 10, máximo: 100)
- `search` (opcional): busca por nome

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "nome": "Smartphone",
        "preco": 899.99,
        "estoque": 50,
        "data_criacao": "2024-01-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

### GET /produtos/:id
Busca produto por ID.

**Parâmetros:**
- `id`: ID do produto (UUID v4)

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Smartphone",
    "preco": 899.99,
    "estoque": 50,
    "data_criacao": "2024-01-01T12:00:00.000Z"
  }
}
```

**Resposta (404):**
```json
{
  "success": false,
  "error": "Produto não encontrado"
}
```

### PUT /produtos/:id
Atualiza um produto.

**Parâmetros:**
- `id`: ID do produto

**Body:**
```json
{
  "nome": "string",
  "preco": number,
  "estoque": number
}
```

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "Smartphone Atualizado",
    "preco": 799.99,
    "estoque": 45,
    "data_criacao": "2024-01-01T12:00:00.000Z"
  },
  "message": "Produto atualizado com sucesso"
}
```

### DELETE /produtos/:id
Remove um produto.

**Parâmetros:**
- `id`: ID do produto

**Resposta (200):**
```json
{
  "success": true,
  "message": "Produto removido com sucesso"
}
```

---

## Clientes

### POST /clientes
Cria um novo cliente.

**Body:**
```json
{
  "nome": "string",
  "email": "string"
}
```

**Validações:**
- `nome`: obrigatório, 1-255 caracteres
- `email`: obrigatório, formato válido, único

**Resposta (201):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "data_criacao": "2024-01-01T12:00:00.000Z"
  },
  "message": "Cliente criado com sucesso"
}
```

**Resposta (409) - Email duplicado:**
```json
{
  "success": false,
  "error": "Email já está em uso"
}
```

### GET /clientes
Lista clientes com paginação e busca.

**Query Parameters:**
- `page` (opcional): número da página (padrão: 1)
- `limit` (opcional): itens por página (padrão: 10, máximo: 100)
- `search` (opcional): busca por nome ou email

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "clients": [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@email.com",
        "data_criacao": "2024-01-01T12:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

### GET /clientes/:id
Busca cliente por ID.

**Parâmetros:**
- `id`: ID do cliente (inteiro positivo)

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com",
    "data_criacao": "2024-01-01T12:00:00.000Z"
  }
}
```

**Resposta (404):**
```json
{
  "success": false,
  "error": "Cliente não encontrado"
}
```

### PUT /clientes/:id
Atualiza um cliente.

**Parâmetros:**
- `id`: ID do cliente

**Body:**
```json
{
  "nome": "string",
  "email": "string"
}
```

**Resposta (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "nome": "João Santos",
    "email": "joao.santos@email.com",
    "data_criacao": "2024-01-01T12:00:00.000Z"
  },
  "message": "Cliente atualizado com sucesso"
}
```

### DELETE /clientes/:id
Remove um cliente.

**Parâmetros:**
- `id`: ID do cliente

**Resposta (200):**
```json
{
  "success": true,
  "message": "Cliente removido com sucesso"
}
```

## Códigos de Status HTTP

- **200** - Sucesso
- **201** - Criado com sucesso
- **400** - Dados inválidos
- **404** - Recurso não encontrado
- **409** - Conflito (email duplicado)
- **500** - Erro interno do servidor

## Exemplos com cURL

### Criar Produto
```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Notebook",
    "preco": 2500.00,
    "estoque": 10
  }'
```

### Listar Produtos
```bash
curl "http://localhost:3000/api/produtos?page=1&limit=5"
```

### Buscar Produto
```bash
curl http://localhost:3000/api/produtos/1
```

### Criar Cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Silva",
    "email": "maria@email.com"
  }'
```

### Listar Clientes com Busca
```bash
curl "http://localhost:3000/api/clientes?search=maria"
```
