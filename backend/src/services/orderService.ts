import { Prisma } from '@prisma/client';
import prisma from '@/config/database';
import { ApiError } from '@/utils/ApiError';
import { CartService } from './cartService';

export class OrderService {
  static async getUserOrders(userId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.order.count({ where: { userId } })
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getOrderById(id: string, userId?: string) {
    const where: Prisma.OrderWhereInput = { id };
    if (userId) where.userId = userId;

    const order = await prisma.order.findFirst({
      where,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
                price: true
              }
            }
          }
        },
        payments: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    return order;
  }

  static async createOrder(userId: string, shippingInfo: any) {
    // Get user's cart
    const cart = await CartService.getCart(userId);
    
    if (!cart.items || cart.items.length === 0) {
      throw new ApiError(400, 'Cart is empty');
    }

    // Validate cart
    const validation = await CartService.validateCart(userId);
    if (!validation.isValid) {
      throw new ApiError(400, 'Cart validation failed', validation.issues);
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount: cart.totalPrice,
        shippingInfo,
        items: {
          create: cart.items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true
              }
            }
          }
        }
      }
    });

    // Clear cart after order creation
    await CartService.clearCart(userId);

    return order;
  }

  static async updateOrderStatus(id: string, status: string, trackingId?: string) {
    const order = await prisma.order.findUnique({
      where: { id }
    });

    if (!order) {
      throw new ApiError(404, 'Order not found');
    }

    const updateData: any = { status };
    if (trackingId) updateData.trackingId = trackingId;
    if (status === 'DELIVERED') updateData.deliveredAt = new Date();

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true
              }
            }
          }
        }
      }
    });

    return updatedOrder;
  }

  static async getAllOrders(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.order.count()
    ]);

    return {
      orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}