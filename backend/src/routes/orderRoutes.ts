import { Router } from 'express';
import { OrderController } from '@/controllers/orderController';
import { validate } from '@/middleware/validation';
import { authenticate, authorize } from '@/middleware/auth';
import { createOrderSchema, updateOrderStatusSchema, idParamSchema } from '@/utils/validationSchemas';

const router = Router();

router.get('/', authenticate, authorize('ADMIN'), OrderController.getAllOrders);
router.get('/my-orders', authenticate, OrderController.getUserOrders);
router.get('/:id', authenticate, validate({ params: idParamSchema }), OrderController.getOrderById);
router.post('/', authenticate, validate({ body: createOrderSchema }), OrderController.createOrder);
router.patch('/:id/status', authenticate, authorize('ADMIN'), validate({ params: idParamSchema, body: updateOrderStatusSchema }), OrderController.updateOrderStatus);

export default router;