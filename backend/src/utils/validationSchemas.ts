import { z } from 'zod';

// Common schemas
export const idParamSchema = z.object({
  id: z.string().cuid('Invalid ID format')
});

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  address: z.string().optional()
});

// Category schemas
export const createCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().optional(),
  image: z.string().url().optional()
});

export const updateCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters').optional(),
  description: z.string().optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().optional()
});

// Product schemas
export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().min(0, 'Stock cannot be negative'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  categoryId: z.string().cuid('Invalid category ID'),
  sku: z.string().min(3, 'SKU must be at least 3 characters'),
  weight: z.number().positive().optional(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive()
  }).optional(),
  isOrganic: z.boolean().default(true),
  model3D: z.string().url().optional()
});

export const updateProductSchema = createProductSchema.partial();

export const productQuerySchema = z.object({
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  categoryId: z.string().cuid().optional(),
  minPrice: z.string().transform(Number).optional(),
  maxPrice: z.string().transform(Number).optional(),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'price', 'rating', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  isOrganic: z.string().transform(val => val === 'true').optional(),
  inStock: z.string().transform(val => val === 'true').optional()
});

// Cart schemas
export const addToCartSchema = z.object({
  productId: z.string().cuid('Invalid product ID'),
  quantity: z.number().int().positive('Quantity must be positive')
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive('Quantity must be positive')
});

// Order schemas
export const createOrderSchema = z.object({
  shippingInfo: z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    address: z.string().min(10, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(6, 'Valid pincode is required')
  })
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED']),
  trackingId: z.string().optional()
});

// Review schemas
export const createReviewSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  comment: z.string().optional(),
  images: z.array(z.string().url()).optional()
});

export const updateReviewSchema = createReviewSchema.partial();

// Additional auth schemas
export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required')
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters')
});