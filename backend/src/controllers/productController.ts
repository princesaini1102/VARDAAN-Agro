import { Request, Response, NextFunction } from 'express';
import { ProductService } from '@/services/productService';
import { sendSuccess, sendCreated } from '@/utils/ApiResponse';
import { AuthenticatedRequest } from '@/types';

export class ProductController {
  static async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ProductService.getAllProducts(req.query as any);
      
      sendSuccess(res, 'Products retrieved successfully', result.products, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      
      sendSuccess(res, 'Product retrieved successfully', product);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.createProduct(req.body);
      
      sendCreated(res, 'Product created successfully', product);
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductService.updateProduct(id, req.body);
      
      sendSuccess(res, 'Product updated successfully', product);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ProductService.deleteProduct(id);
      
      sendSuccess(res, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getFeaturedProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 8;
      const products = await ProductService.getFeaturedProducts(limit);
      
      sendSuccess(res, 'Featured products retrieved successfully', products);
    } catch (error) {
      next(error);
    }
  }

  static async getRelatedProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { categoryId } = req.query;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
      
      if (!categoryId) {
        return res.status(400).json({
          success: false,
          message: 'Category ID is required'
        });
      }

      const products = await ProductService.getRelatedProducts(id, categoryId as string, limit);
      
      sendSuccess(res, 'Related products retrieved successfully', products);
    } catch (error) {
      next(error);
    }
  }

  static async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const products = await ProductService.searchProducts(q as string, limit);
      
      sendSuccess(res, 'Search results retrieved successfully', products);
    } catch (error) {
      next(error);
    }
  }

  static async updateStock(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { quantity, operation } = req.body;
      
      const product = await ProductService.updateStock(id, quantity, operation);
      
      sendSuccess(res, 'Stock updated successfully', product);
    } catch (error) {
      next(error);
    }
  }
}