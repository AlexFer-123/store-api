import { runQuery } from './connection';

const createTables = async (): Promise<void> => {
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS produtos (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      estoque INTEGER NOT NULL,
      created DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createClientsTable = `
    CREATE TABLE IF NOT EXISTS clientes (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await runQuery(createProductsTable);
    await runQuery(createClientsTable);
    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas:', error);
    throw error;
  }
};

if (require.main === module) {
  createTables().then(() => {
    process.exit(0);
  }).catch(() => {
    process.exit(1);
  });
}

export { createTables };
