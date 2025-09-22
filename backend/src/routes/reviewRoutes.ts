import { Router } from 'express';
import { ReviewController } from '@/controllers/reviewController';
import { validate } from '@/middleware/validation';
import { authenticate } from '@/middleware/auth';
import { createReviewSchema, updateReviewSchema, idParamSchema } from '@/utils/validationSchemas';

const router = Router();

router.get('/product/:productId', validate({ params: idParamSchema }), ReviewController.getProductReviews);
router.post('/product/:productId', authenticate, validate({ params: idParamSchema, body: createReviewSchema }), ReviewController.createReview);
router.put('/:id', authenticate, validate({ params: idParamSchema, body: updateReviewSchema }), ReviewController.updateReview);
router.delete('/:id', authenticate, validate({ params: idParamSchema }), ReviewController.deleteReview);

export default router;