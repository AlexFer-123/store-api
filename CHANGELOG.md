# Changelog

## [2.0.0] - 2024-01-15

### ✨ Principais Alterações

#### 🆔 Migração para UUID v4
- **BREAKING CHANGE**: IDs agora usam UUID v4 em vez de integers
- Produtos e clientes agora têm IDs únicos universais
- Melhor segurança e escalabilidade
- Compatível com sistemas distribuídos

#### 🔧 Ferramentas de Desenvolvimento
- Adicionado **nodemon** para desenvolvimento
- Novo script `npm run dev:nodemon` como alternativa ao ts-node-dev
- Configuração otimizada para hot-reload

### 📋 Detalhes das Alterações

#### Banco de Dados
- **Antes**: `id INTEGER PRIMARY KEY AUTOINCREMENT`
- **Agora**: `id TEXT PRIMARY KEY` (UUID v4)
- Tabelas recriadas automaticamente no primeiro build

#### API Endpoints
- Todos os endpoints mantêm a mesma funcionalidade
- Parâmetros `:id` agora esperam UUID em vez de números
- Validação atualizada para aceitar apenas UUIDs válidos

#### Modelos (Models)
- `ProductModel.create()` agora retorna `string` (UUID)
- `ClientModel.create()` agora retorna `string` (UUID)
- Todos os métodos `findById()`, `update()`, `delete()` usam UUID

#### Controladores (Controllers)
- Validação de ID obrigatório adicionada
- Melhor tratamento de erros para IDs inválidos
- Mantida compatibilidade com validações existentes

#### Validações
- Middleware atualizado para validar UUID v4
- Mensagens de erro mais claras
- Validação de formato UUID antes de consultas

### 🚀 Novos Scripts

```bash
# Desenvolvimento com nodemon
npm run dev:nodemon

# Teste da API (novo)
npm run test:api
```

### 📖 Documentação Atualizada

- README.md com exemplos de UUID
- docs/API.md com novos formatos de resposta
- Exemplos práticos em `/examples`

### 🔄 Migração

#### Para usuários existentes:
1. **Backup dos dados** (se necessário)
2. Execute `npm install` para novas dependências
3. Execute `npm run build` (recria tabelas automaticamente)
4. Atualize integrações para usar UUID nos IDs

#### Exemplo de resposta antiga vs nova:

**Antes:**
```json
{
  "id": 1,
  "nome": "Produto"
}
```

**Agora:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Produto"
}
```

### 🛠️ Dependências Adicionadas

- `uuid@^9.0.1` - Geração de UUID v4
- `@types/uuid@^9.0.8` - Tipos TypeScript para UUID
- `nodemon@^3.0.2` - Ferramenta de desenvolvimento
- `axios@^1.6.2` - Para testes da API (dev)

### ⚡ Melhorias de Performance

- UUIDs são gerados localmente (sem consulta ao banco)
- Menos dependência de auto-increment do SQLite
- Melhor para ambientes distribuídos

### 🔒 Segurança

- IDs não são mais sequenciais (mais difíceis de adivinhar)
- UUID v4 usa randomização criptográfica
- Melhor para APIs públicas

### 📝 Notas de Desenvolvimento

- TypeScript configurado para strict mode com UUID
- ESLint atualizado para ignorar parâmetros `_unused`
- Testes automatizados incluídos

---

## [1.0.0] - 2024-01-14

### ✨ Lançamento Inicial

- API RESTful completa para produtos e clientes
- Arquitetura MVC com TypeScript
- Banco SQLite com tabelas automáticas
- Deploy configurado para Render.com
- Documentação completa
- Pipeline CI/CD com GitHub Actions
