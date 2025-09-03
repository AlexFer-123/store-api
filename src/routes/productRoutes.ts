import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { validateProduct, validateId, validatePagination } from '../middleware/validation';

const router = Router();

router.post('/', validateProduct, ProductController.create);
router.get('/', validatePagination, ProductController.findAll);
router.get('/:id', validateId, ProductController.findById);
router.put('/:id', validateId, validateProduct, ProductController.update);
router.delete('/:id', validateId, ProductController.delete);

export default router;
