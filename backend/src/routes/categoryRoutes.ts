import { Router } from 'express';
import { CategoryController } from '@/controllers/categoryController';
import { validate } from '@/middleware/validation';
import { authenticate, authorize } from '@/middleware/auth';
import { createCategorySchema, updateCategorySchema, idParamSchema } from '@/utils/validationSchemas';

const router = Router();

router.get('/', CategoryController.getAllCategories);
router.get('/:id', validate({ params: idParamSchema }), CategoryController.getCategoryById);
router.post('/', authenticate, authorize('ADMIN'), validate({ body: createCategorySchema }), CategoryController.createCategory);
router.put('/:id', authenticate, authorize('ADMIN'), validate({ params: idParamSchema, body: updateCategorySchema }), CategoryController.updateCategory);
router.delete('/:id', authenticate, authorize('ADMIN'), validate({ params: idParamSchema }), CategoryController.deleteCategory);

export default router;