import prisma from '@/config/database';
import { ApiError } from '@/utils/ApiError';

export class ReviewService {
  static async getProductReviews(productId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { 
          productId,
          isActive: true 
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.review.count({ 
        where: { 
          productId,
          isActive: true 
        } 
      })
    ]);

    return {
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async createReview(userId: string, productId: string, reviewData: {
    rating: number;
    comment?: string;
    images?: string[];
  }) {
    // Check if user has already reviewed this product
    const existingReview = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId
        }
      }
    });

    if (existingReview) {
      throw new ApiError(409, 'You have already reviewed this product');
    }

    // Check if user has purchased this product
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: {
          userId,
          status: 'DELIVERED'
        }
      }
    });

    if (!hasPurchased) {
      throw new ApiError(403, 'You can only review products you have purchased');
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId,
        rating: reviewData.rating,
        comment: reviewData.comment,
        images: reviewData.images || []
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    // Update product rating
    await this.updateProductRating(productId);

    return review;
  }

  static async updateReview(reviewId: string, userId: string, updateData: {
    rating?: number;
    comment?: string;
    images?: string[];
  }) {
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId,
        isActive: true
      }
    });

    if (!review) {
      throw new ApiError(404, 'Review not found or you are not authorized to update it');
    }

    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    // Update product rating
    await this.updateProductRating(review.productId);

    return updatedReview;
  }

  static async deleteReview(reviewId: string, userId: string) {
    const review = await prisma.review.findFirst({
      where: {
        id: reviewId,
        userId,
        isActive: true
      }
    });

    if (!review) {
      throw new ApiError(404, 'Review not found or you are not authorized to delete it');
    }

    await prisma.review.update({
      where: { id: reviewId },
      data: { isActive: false }
    });

    // Update product rating
    await this.updateProductRating(review.productId);
  }

  private static async updateProductRating(productId: string) {
    const reviews = await prisma.review.findMany({
      where: {
        productId,
        isActive: true
      },
      select: {
        rating: true
      }
    });

    if (reviews.length === 0) {
      await prisma.product.update({
        where: { id: productId },
        data: {
          rating: 0,
          reviewCount: 0
        }
      });
      return;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: Math.round(averageRating * 100) / 100, // Round to 2 decimal places
        reviewCount: reviews.length
      }
    });
  }
}