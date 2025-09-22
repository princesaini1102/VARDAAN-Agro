import { Prisma } from '@prisma/client';
import prisma from '@/config/database';
import { ApiError } from '@/utils/ApiError';
import { ProductFilters, PaginationQuery } from '@/types';

export class ProductService {
  static async getAllProducts(filters: ProductFilters & PaginationQuery) {
    const {
      page = '1',
      limit = '10',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      categoryId,
      minPrice,
      maxPrice,
      inStock,
      isOrganic,
      rating,
      search
    } = filters;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: Prisma.ProductWhereInput = {
      isActive: true,
      ...(categoryId && { categoryId }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
      ...(inStock && { stock: { gt: 0 } }),
      ...(isOrganic !== undefined && { isOrganic: isOrganic === 'true' }),
      ...(rating && { rating: { gte: parseFloat(rating) } }),
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } }
        ]
      })
    };

    // Build orderBy clause
    const sortOrderValue = (sortOrder === 'asc' || sortOrder === 'desc') ? sortOrder : 'desc';
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (sortBy === 'name') orderBy.name = sortOrderValue;
    else if (sortBy === 'price') orderBy.price = sortOrderValue;
    else if (sortBy === 'rating') orderBy.rating = sortOrderValue;
    else orderBy.createdAt = sortOrderValue;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true }
          },
          _count: {
            select: { reviews: true }
          }
        },
        orderBy,
        skip,
        take: limitNum
      }),
      prisma.product.count({ where })
    ]);

    return {
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findFirst({
      where: { id, isActive: true },
      include: {
        category: {
          select: { id: true, name: true }
        },
        reviews: {
          where: { isActive: true },
          include: {
            user: {
              select: { id: true, name: true, avatar: true }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        },
        _count: {
          select: { reviews: true }
        }
      }
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    return product;
  }

  static async createProduct(productData: any) {
    // Check if SKU already exists
    const existingProduct = await prisma.product.findUnique({
      where: { sku: productData.sku }
    });

    if (existingProduct) {
      throw new ApiError(409, 'Product with this SKU already exists');
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: productData.categoryId }
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    const product = await prisma.product.create({
      data: productData,
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    });

    return product;
  }

  static async updateProduct(id: string, updateData: any) {
    // Check if product exists
    const existingProduct = await prisma.product.findFirst({
      where: { id, isActive: true }
    });

    if (!existingProduct) {
      throw new ApiError(404, 'Product not found');
    }

    // If updating SKU, check for conflicts
    if (updateData.sku && updateData.sku !== existingProduct.sku) {
      const skuExists = await prisma.product.findUnique({
        where: { sku: updateData.sku }
      });

      if (skuExists) {
        throw new ApiError(409, 'Product with this SKU already exists');
      }
    }

    // If updating category, verify it exists
    if (updateData.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: updateData.categoryId }
      });

      if (!category) {
        throw new ApiError(404, 'Category not found');
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: {
          select: { id: true, name: true }
        }
      }
    });

    return product;
  }

  static async deleteProduct(id: string) {
    const product = await prisma.product.findFirst({
      where: { id, isActive: true }
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    // Soft delete
    await prisma.product.update({
      where: { id },
      data: { isActive: false }
    });
  }

  static async updateStock(id: string, quantity: number, operation: 'add' | 'subtract') {
    const product = await prisma.product.findFirst({
      where: { id, isActive: true }
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    const newStock = operation === 'add' 
      ? product.stock + quantity 
      : product.stock - quantity;

    if (newStock < 0) {
      throw new ApiError(400, 'Insufficient stock');
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { stock: newStock }
    });

    return updatedProduct;
  }

  static async getFeaturedProducts(limit: number = 8) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        stock: { gt: 0 }
      },
      include: {
        category: {
          select: { id: true, name: true }
        }
      },
      orderBy: [
        { rating: 'desc' },
        { reviewCount: 'desc' }
      ],
      take: limit
    });

    return products;
  }

  static async getRelatedProducts(productId: string, categoryId: string, limit: number = 4) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        categoryId,
        id: { not: productId },
        stock: { gt: 0 }
      },
      include: {
        category: {
          select: { id: true, name: true }
        }
      },
      orderBy: { rating: 'desc' },
      take: limit
    });

    return products;
  }

  static async searchProducts(query: string, limit: number = 10) {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { category: { name: { contains: query } } }
        ]
      },
      include: {
        category: {
          select: { id: true, name: true }
        }
      },
      take: limit
    });

    return products;
  }
}