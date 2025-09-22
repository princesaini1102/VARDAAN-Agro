import { Request, Response, NextFunction } from 'express';
import { OrderService } from '@/services/orderService';
import { sendSuccess, sendCreated } from '@/utils/ApiResponse';
import { AuthenticatedRequest } from '@/types';

export class OrderController {
  static async getUserOrders(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await OrderService.getUserOrders(req.user.id, page, limit);
      
      sendSuccess(res, 'Orders retrieved successfully', result.orders, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getOrderById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.role === 'ADMIN' ? undefined : req.user?.id;
      
      const order = await OrderService.getOrderById(id, userId);
      
      sendSuccess(res, 'Order retrieved successfully', order);
    } catch (error) {
      next(error);
    }
  }

  static async createOrder(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { shippingInfo } = req.body;
      const order = await OrderService.createOrder(req.user.id, shippingInfo);
      
      sendCreated(res, 'Order created successfully', order);
    } catch (error) {
      next(error);
    }
  }

  static async updateOrderStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, trackingId } = req.body;
      
      const order = await OrderService.updateOrderStatus(id, status, trackingId);
      
      sendSuccess(res, 'Order status updated successfully', order);
    } catch (error) {
      next(error);
    }
  }

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await OrderService.getAllOrders(page, limit);
      
      sendSuccess(res, 'Orders retrieved successfully', result.orders, result.pagination);
    } catch (error) {
      next(error);
    }
  }
}