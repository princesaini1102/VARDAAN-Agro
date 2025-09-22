import prisma from '@/config/database';
import { ApiError } from '@/utils/ApiError';

export class CategoryService {
  static async getAllCategories() {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    });

    return categories;
  }

  static async getCategoryById(id: string) {
    const category = await prisma.category.findFirst({
      where: { id, isActive: true },
      include: {
        products: {
          where: { isActive: true },
          take: 10
        },
        _count: {
          select: { products: true }
        }
      }
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    return category;
  }

  static async createCategory(categoryData: {
    name: string;
    description?: string;
    image?: string;
  }) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: categoryData.name }
    });

    if (existingCategory) {
      throw new ApiError(409, 'Category with this name already exists');
    }

    const category = await prisma.category.create({
      data: categoryData
    });

    return category;
  }

  static async updateCategory(id: string, updateData: any) {
    const existingCategory = await prisma.category.findFirst({
      where: { id, isActive: true }
    });

    if (!existingCategory) {
      throw new ApiError(404, 'Category not found');
    }

    const category = await prisma.category.update({
      where: { id },
      data: updateData
    });

    return category;
  }

  static async deleteCategory(id: string) {
    const category = await prisma.category.findFirst({
      where: { id, isActive: true }
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    await prisma.category.update({
      where: { id },
      data: { isActive: false }
    });
  }
}