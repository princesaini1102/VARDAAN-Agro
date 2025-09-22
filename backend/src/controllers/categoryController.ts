import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '@/services/categoryService';
import { sendSuccess, sendCreated } from '@/utils/ApiResponse';
import { AuthenticatedRequest } from '@/types';

export class CategoryController {
  static async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      
      sendSuccess(res, 'Categories retrieved successfully', categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryService.getCategoryById(id);
      
      sendSuccess(res, 'Category retrieved successfully', category);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.createCategory(req.body);
      
      sendCreated(res, 'Category created successfully', category);
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const category = await CategoryService.updateCategory(id, req.body);
      
      sendSuccess(res, 'Category updated successfully', category);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await CategoryService.deleteCategory(id);
      
      sendSuccess(res, 'Category deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}