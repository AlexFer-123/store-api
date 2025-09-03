# Deploy no Render

Este guia explica como fazer deploy da API no Render.com.

## Pré-requisitos

- Conta no [Render.com](https://render.com)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- Código da API commitado no repositório

## Configuração Automática

A API está configurada para deploy automático no Render usando o arquivo `render.yaml`.

### Arquivos de Configuração

1. **render.yaml** - Configuração principal do Render
2. **package.json** - Scripts de build atualizados
3. **Dockerfile** - Configuração Docker (opcional)
4. **env.example** - Exemplo de variáveis de ambiente

## Passo a Passo para Deploy

### 1. Preparar o Repositório

```bash
# Fazer commit de todas as alterações
git add .
git commit -m "Configuração para deploy no Render"
git push origin main
```

### 2. Criar Serviço no Render

1. Acesse [Render Dashboard](https://dashboard.render.com)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório Git
4. Selecione o repositório da API
5. Configure os detalhes:

#### Configurações Básicas
- **Name**: `products-backend-api`
- **Region**: `Oregon (US West)` ou mais próximo
- **Branch**: `main`
- **Root Directory**: deixe vazio
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build && npm run init-db`
- **Start Command**: `npm start`

#### Configurações Avançadas
- **Plan**: `Free` (ou escolha um pago)
- **Node Version**: `18` (será detectado automaticamente)

### 3. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no Render:

```
NODE_ENV=production
PORT=10000
DATABASE_PATH=/opt/render/project/src/database.sqlite
```

**Como configurar:**
1. No dashboard do serviço, vá para **"Environment"**
2. Adicione cada variável clicando em **"Add Environment Variable"**

### 4. Deploy Automático

O Render irá:
1. Clonar o repositório
2. Instalar dependências (`npm install`)
3. Compilar TypeScript (`npm run build`)
4. Inicializar banco de dados (`npm run init-db`)
5. Iniciar o servidor (`npm start`)

## Configuração com render.yaml

O arquivo `render.yaml` automatiza toda a configuração:

```yaml
services:
  - type: web
    name: products-backend-api
    env: node
    plan: free
    buildCommand: npm install && npm run build && npm run init-db
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
    healthCheckPath: /api/health
    disk:
      name: products-db
      mountPath: /opt/render/project/src
      sizeGB: 1
```

### Deploy com render.yaml

1. Coloque o arquivo `render.yaml` na raiz do projeto
2. No Render, escolha **"Blueprint"** em vez de "Web Service"
3. Conecte o repositório
4. O Render lerá automaticamente a configuração

## Monitoramento

### Health Check
A API tem um endpoint de health check em `/api/health` que o Render usa para monitorar a aplicação.

### Logs
Acesse os logs em tempo real no dashboard do Render:
1. Vá para o seu serviço
2. Clique na aba **"Logs"**

### Métricas
O Render fornece métricas básicas como:
- CPU usage
- Memory usage
- Response times
- Error rates

## URLs da API

Após o deploy, sua API estará disponível em:
```
https://products-backend-api.onrender.com
```

### Endpoints Principais
- Health check: `https://products-backend-api.onrender.com/api/health`
- Produtos: `https://products-backend-api.onrender.com/api/produtos`
- Clientes: `https://products-backend-api.onrender.com/api/clientes`

## Banco de Dados

### SQLite em Produção
O banco SQLite será criado automaticamente no primeiro deploy. Os dados persistem usando o disco configurado no `render.yaml`.

### Backup
Para fazer backup do banco:
1. Use o shell do Render para acessar o arquivo
2. Ou implemente endpoints para exportar dados

## Deploy Manual (Alternativo)

Se preferir não usar o `render.yaml`:

### 1. Configuração Manual
- **Build Command**: `npm install && npm run build && npm run init-db`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `NODE_ENV=production`
  - `PORT=10000`

### 2. Auto-Deploy
Configure auto-deploy para fazer deploy automático a cada push:
1. Vá para **"Settings"** → **"Build & Deploy"**
2. Ative **"Auto-Deploy"**

## Troubleshooting

### Problemas Comuns

1. **ESLint falha no CI/CD**
   ```bash
   # Solução: Reinstalar dependências
   npm run clean
   
   # Ou manualmente:
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Build falha**
   - Verifique se todas as dependências estão no `package.json`
   - Confirme que o TypeScript compila localmente
   - Execute `npm run lint` para verificar problemas de código

3. **Banco não inicializa**
   - Verifique se o comando `npm run init-db` está no build
   - Confirme as permissões de escrita no diretório

4. **Aplicação não inicia**
   - Verifique os logs no dashboard
   - Confirme se a porta está configurada corretamente

5. **Health check falha**
   - Verifique se `/api/health` responde localmente
   - Confirme se o servidor está ouvindo na porta correta

6. **Erro "@typescript-eslint/recommended config not found"**
   ```bash
   # Instalar dependências corretas
   npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
   
   # Verificar configuração no .eslintrc.json
   {
     "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
   }
   ```

### Logs Úteis

```bash
# Ver logs em tempo real no dashboard do Render
# Ou usar CLI do Render (se instalado)
render logs -s products-backend-api
```

## Atualizações

Para atualizar a aplicação:
1. Faça commit das alterações
2. Push para o branch configurado
3. O Render fará deploy automaticamente

## Custos

- **Free Plan**: 750 horas/mês, hiberna após 15 min de inatividade
- **Starter Plan**: $7/mês, sem hibernação
- **Standard Plan**: $25/mês, mais recursos

## Alternativas de Deploy

Se preferir outras plataformas:
- **Heroku**: Similar ao Render
- **Railway**: Boa alternativa
- **DigitalOcean App Platform**: Para mais controle
- **AWS/GCP/Azure**: Para aplicações enterprise
