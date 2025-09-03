const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  try {
    console.log('🚀 Testando API com UUID...\n');

    console.log('1️⃣ Testando Health Check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', health.data.message);

    console.log('\n2️⃣ Criando produto...');
    const newProduct = {
      nome: 'Smartphone iPhone 15',
      preco: 4999.99,
      estoque: 25
    };
    
    const productResponse = await axios.post(`${API_BASE}/produtos`, newProduct);
    const productId = productResponse.data.data.id;
    console.log('✅ Produto criado com UUID:', productId);
    console.log('📦 Dados:', productResponse.data.data);

    console.log('\n3️⃣ Buscando produto por UUID...');
    const foundProduct = await axios.get(`${API_BASE}/produtos/${productId}`);
    console.log('✅ Produto encontrado:', foundProduct.data.data.nome);

    console.log('\n4️⃣ Criando cliente...');
    const newClient = {
      nome: 'João da Silva',
      email: 'joao@exemplo.com'
    };
    
    const clientResponse = await axios.post(`${API_BASE}/clientes`, newClient);
    const clientId = clientResponse.data.data.id;
    console.log('✅ Cliente criado com UUID:', clientId);
    console.log('👤 Dados:', clientResponse.data.data);

    console.log('\n5️⃣ Listando produtos...');
    const productsList = await axios.get(`${API_BASE}/produtos`);
    console.log('✅ Total de produtos:', productsList.data.data.products.length);

    console.log('\n6️⃣ Listando clientes...');
    const clientsList = await axios.get(`${API_BASE}/clientes`);
    console.log('✅ Total de clientes:', clientsList.data.data.clients.length);

    console.log('\n🎉 Todos os testes passaram! UUID funcionando perfeitamente.');

  } catch (error) {
    console.error('❌ Erro no teste:', error.response?.data || error.message);
  }
}

if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };
