import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  };
}

export interface ProductFilters {
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  isOrganic?: string;
  inStock?: string;
  rating?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}