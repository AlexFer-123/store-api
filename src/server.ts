import app from './app';
import { createTables } from './database/init';

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    await createTables();
    console.log('Banco de dados inicializado com sucesso');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`API disponível em: http://localhost:${PORT}/api`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Erro ao inicializar servidor:', error);
    process.exit(1);
  }
};

startServer();
