import { Response, NextFunction } from 'express';
import { CartService } from '@/services/cartService';
import { sendSuccess, sendCreated } from '@/utils/ApiResponse';
import { AuthenticatedRequest } from '@/types';

export class CartController {
  static async getCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const cart = await CartService.getCart(req.user.id);
      
      sendSuccess(res, 'Cart retrieved successfully', cart);
    } catch (error) {
      next(error);
    }
  }

  static async addToCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { productId, quantity } = req.body;
      const cartItem = await CartService.addToCart(req.user.id, productId, quantity);
      
      sendCreated(res, 'Item added to cart successfully', cartItem);
    } catch (error) {
      next(error);
    }
  }

  static async updateCartItem(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { productId } = req.params;
      const { quantity } = req.body;
      
      const cartItem = await CartService.updateCartItem(req.user.id, productId, quantity);
      
      sendSuccess(res, 'Cart item updated successfully', cartItem);
    } catch (error) {
      next(error);
    }
  }

  static async removeFromCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { productId } = req.params;
      await CartService.removeFromCart(req.user.id, productId);
      
      sendSuccess(res, 'Item removed from cart successfully');
    } catch (error) {
      next(error);
    }
  }

  static async clearCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      await CartService.clearCart(req.user.id);
      
      sendSuccess(res, 'Cart cleared successfully');
    } catch (error) {
      next(error);
    }
  }

  static async validateCart(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const validation = await CartService.validateCart(req.user.id);
      
      sendSuccess(res, 'Cart validation completed', validation);
    } catch (error) {
      next(error);
    }
  }
}