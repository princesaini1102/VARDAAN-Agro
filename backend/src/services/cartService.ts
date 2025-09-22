
import prisma from '@/config/database';
import { ApiError } from '@/utils/ApiError';

export class CartService {
  static async getCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
                stock: true,
                isActive: true
              }
            }
          }
        }
      }
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: true,
                  stock: true,
                  isActive: true
                }
              }
            }
          }
        }
      });
    }

    // Filter out inactive products and update total
    const activeItems = cart.items.filter(item => item.product.isActive);
    const totalPrice = activeItems.reduce((sum, item) => sum + (item.quantity * Number(item.price)), 0);

    // Update cart total if needed
    if (Number(cart.totalPrice) !== totalPrice) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: { totalPrice }
      });
    }

    return {
      ...cart,
      items: activeItems,
      totalPrice
    };
  }

  static async addToCart(userId: string, productId: string, quantity: number) {
    // Verify product exists and is active
    const product = await prisma.product.findFirst({
      where: { id: productId, isActive: true }
    });

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (product.stock < quantity) {
      throw new ApiError(400, 'Insufficient stock');
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId }
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    });

    let cartItem;
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      
      if (product.stock < newQuantity) {
        throw new ApiError(400, 'Insufficient stock');
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { 
          quantity: newQuantity,
          price: product.price
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              stock: true
            }
          }
        }
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          price: product.price
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              images: true,
              stock: true
            }
          }
        }
      });
    }

    // Update cart total
    await this.updateCartTotal(cart.id);

    return cartItem;
  }

  static async updateCartItem(userId: string, productId: string, quantity: number) {
    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      },
      include: { product: true }
    });

    if (!cartItem) {
      throw new ApiError(404, 'Item not found in cart');
    }

    if (cartItem.product.stock < quantity) {
      throw new ApiError(400, 'Insufficient stock');
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            stock: true
          }
        }
      }
    });

    // Update cart total
    await this.updateCartTotal(cart.id);

    return updatedItem;
  }

  static async removeFromCart(userId: string, productId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId
        }
      }
    });

    if (!cartItem) {
      throw new ApiError(404, 'Item not found in cart');
    }

    await prisma.cartItem.delete({
      where: { id: cartItem.id }
    });

    // Update cart total
    await this.updateCartTotal(cart.id);
  }

  static async clearCart(userId: string) {
    const cart = await prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) {
      throw new ApiError(404, 'Cart not found');
    }

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    await prisma.cart.update({
      where: { id: cart.id },
      data: { totalPrice: 0 }
    });
  }

  static async validateCart(userId: string) {
    const cart = await this.getCart(userId);
    const issues = [];

    for (const item of cart.items) {
      if (!item.product.isActive) {
        issues.push({
          productId: item.product.id,
          issue: 'Product is no longer available'
        });
      } else if (item.product.stock < item.quantity) {
        issues.push({
          productId: item.product.id,
          issue: `Only ${item.product.stock} items available, but ${item.quantity} requested`
        });
      } else if (Number(item.product.price) !== Number(item.price)) {
        issues.push({
          productId: item.product.id,
          issue: 'Product price has changed'
        });
      }
    }

    return {
      isValid: issues.length === 0,
      issues,
      cart
    };
  }

  private static async updateCartTotal(cartId: string) {
    const cartItems = await prisma.cartItem.findMany({
      where: { cartId }
    });

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.quantity * Number(item.price)), 0);

    await prisma.cart.update({
      where: { id: cartId },
      data: { totalPrice }
    });
  }
}