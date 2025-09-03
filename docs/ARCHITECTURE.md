# Arquitetura da API

## Padrão MVC (Model-View-Controller)

Esta API segue o padrão arquitetural MVC adaptado para APIs RESTful:

### Models (Modelos)
- **Localização**: `src/models/`
- **Responsabilidade**: Interação com o banco de dados
- **Arquivos**:
  - `Product.ts` - Operações CRUD para produtos
  - `Client.ts` - Operações CRUD para clientes

### Controllers (Controladores)
- **Localização**: `src/controllers/`
- **Responsabilidade**: Lógica de negócio e orquestração
- **Arquivos**:
  - `ProductController.ts` - Lógica de produtos
  - `ClientController.ts` - Lógica de clientes

### Routes (Rotas - equivalente às Views)
- **Localização**: `src/routes/`
- **Responsabilidade**: Definição de endpoints e middlewares
- **Arquivos**:
  - `productRoutes.ts` - Rotas de produtos
  - `clientRoutes.ts` - Rotas de clientes
  - `index.ts` - Agregador de rotas

## Camadas da Aplicação

### 1. Camada de Apresentação (Routes)
```
Request → Middleware → Routes → Controller
```

### 2. Camada de Negócio (Controllers)
```
Controller → Validation → Business Logic → Model
```

### 3. Camada de Dados (Models)
```
Model → Database Connection → SQLite
```

## Fluxo de Dados

```
Cliente HTTP
    ↓
Express Router
    ↓
Middleware de Validação
    ↓
Controller
    ↓
Model
    ↓
SQLite Database
```

## Componentes Auxiliares

### Middleware
- **Validação**: Validação de entrada usando express-validator
- **Erro**: Tratamento centralizado de erros
- **Segurança**: Helmet para headers de segurança

### Types
- **Interfaces**: Definições TypeScript para type safety
- **Contratos**: Padronização de dados entre camadas

### Database
- **Connection**: Abstração da conexão SQLite
- **Init**: Scripts de inicialização do banco

## Princípios Aplicados

### Single Responsibility Principle (SRP)
- Cada classe tem uma única responsabilidade
- Models: apenas operações de dados
- Controllers: apenas lógica de negócio
- Routes: apenas definição de endpoints

### Dependency Inversion Principle (DIP)
- Controllers dependem de abstrações (interfaces)
- Models implementam contratos bem definidos

### Open/Closed Principle (OCP)
- Estrutura permite extensão sem modificação
- Novos endpoints podem ser adicionados facilmente

## Vantagens da Arquitetura

1. **Separação de Responsabilidades**: Cada camada tem função específica
2. **Testabilidade**: Componentes isolados facilitam testes unitários
3. **Manutenibilidade**: Código organizado e previsível
4. **Escalabilidade**: Estrutura suporta crescimento da aplicação
5. **Reutilização**: Componentes podem ser reutilizados em diferentes contextos
