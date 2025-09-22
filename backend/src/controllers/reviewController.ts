import { Request, Response, NextFunction } from 'express';
import { ReviewService } from '@/services/reviewService';
import { sendSuccess, sendCreated } from '@/utils/ApiResponse';
import { AuthenticatedRequest } from '@/types';

export class ReviewController {
  static async getProductReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await ReviewService.getProductReviews(productId, page, limit);
      
      sendSuccess(res, 'Reviews retrieved successfully', result.reviews, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async createReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { productId } = req.params;
      const review = await ReviewService.createReview(req.user.id, productId, req.body);
      
      sendCreated(res, 'Review created successfully', review);
    } catch (error) {
      next(error);
    }
  }

  static async updateReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { id } = req.params;
      const review = await ReviewService.updateReview(id, req.user.id, req.body);
      
      sendSuccess(res, 'Review updated successfully', review);
    } catch (error) {
      next(error);
    }
  }

  static async deleteReview(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }

      const { id } = req.params;
      await ReviewService.deleteReview(id, req.user.id);
      
      sendSuccess(res, 'Review deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}