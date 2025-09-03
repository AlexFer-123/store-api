import { Router } from 'express';
import productRoutes from './productRoutes';
import clientRoutes from './clientRoutes';

const router = Router();

router.use('/produtos', productRoutes);
router.use('/clientes', clientRoutes);

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

export default router;
