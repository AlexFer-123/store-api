import { Router } from 'express';
import { ClientController } from '../controllers/ClientController';
import { validateClient, validateId, validatePagination } from '../middleware/validation';

const router = Router();

router.post('/', validateClient, ClientController.create);
router.get('/', validatePagination, ClientController.findAll);
router.get('/:id', validateId, ClientController.findById);
router.put('/:id', validateId, validateClient, ClientController.update);
router.delete('/:id', validateId, ClientController.delete);

export default router;
