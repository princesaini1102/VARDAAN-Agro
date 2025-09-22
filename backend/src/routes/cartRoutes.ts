import { Router } from 'express';
import { CartController } from '@/controllers/cartController';
import { validate } from '@/middleware/validation';
import { authenticate } from '@/middleware/auth';
import { addToCartSchema, updateCartItemSchema, idParamSchema } from '@/utils/validationSchemas';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       401:
 *         description: Authentication required
 */
router.get('/', CartController.getCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *       400:
 *         description: Insufficient stock
 *       404:
 *         description: Product not found
 */
router.post('/add', validate({ body: addToCartSchema }), CartController.addToCart);

/**
 * @swagger
 * /cart/item/{productId}:
 *   put:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       400:
 *         description: Insufficient stock
 *       404:
 *         description: Item not found in cart
 */
router.put('/item/:productId', validate({ params: idParamSchema, body: updateCartItemSchema }), CartController.updateCartItem);

/**
 * @swagger
 * /cart/item/{productId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *       404:
 *         description: Item not found in cart
 */
router.delete('/item/:productId', validate({ params: idParamSchema }), CartController.removeFromCart);

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     summary: Clear entire cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Cart not found
 */
router.delete('/clear', CartController.clearCart);

/**
 * @swagger
 * /cart/validate:
 *   get:
 *     summary: Validate cart items (stock, prices, availability)
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart validation completed
 *       404:
 *         description: Cart not found
 */
router.get('/validate', CartController.validateCart);

export default router;