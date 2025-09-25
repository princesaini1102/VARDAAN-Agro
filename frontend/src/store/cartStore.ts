import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product } from '@/types';
import { toast } from 'react-hot-toast';

// Mock products for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Oyster Mushrooms',
    description: 'Fresh organic oyster mushrooms',
    price: 299,
    stock: 50,
    images: ['https://images.unsplash.com/photo-1518864677427-aca22c9f8f54?w=400&h=400&fit=crop'],
    categoryId: '1',
    sku: 'OM001',
    isOrganic: true,
    isActive: true,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Shiitake Mushrooms',
    description: 'Premium shiitake mushrooms',
    price: 399,
    stock: 30,
    images: ['https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=400&fit=crop'],
    categoryId: '1',
    sku: 'SM001',
    isOrganic: true,
    isActive: true,
    reviewCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
}

interface CartActions {
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  validateCart: () => Promise<any>;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearError: () => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
    // Initial state
    cart: null,
    isLoading: false,
    error: null,
    isOpen: false,

    // Actions
    fetchCart: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // If no cart exists, create one with sample items
        const currentState = get();
        if (!currentState.cart) {
          const sampleItems: CartItem[] = [
            {
              id: 'item-1',
              cartId: 'mock-cart',
              productId: '1',
              quantity: 2,
              price: 299,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              product: mockProducts[0]
            },
            {
              id: 'item-2',
              cartId: 'mock-cart',
              productId: '2',
              quantity: 1,
              price: 399,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              product: mockProducts[1]
            }
          ];
          
          set((state) => {
            state.cart = {
              id: 'mock-cart',
              userId: 'mock-user',
              totalPrice: sampleItems.reduce((total, item) => total + (item.price * item.quantity), 0),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              items: sampleItems
            };
            state.isLoading = false;
          });
        } else {
          set((state) => {
            state.isLoading = false;
          });
        }
      } catch (error: any) {
        set((state) => {
          state.error = 'Failed to fetch cart';
          state.isLoading = false;
        });
      }
    },

    addToCart: async (productId: string, quantity: number) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const product = mockProducts.find(p => p.id === productId);
        if (!product) throw new Error('Product not found');

        set((state) => {
          if (!state.cart) {
            state.cart = {
              id: 'mock-cart',
              userId: 'mock-user',
              totalPrice: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              items: []
            };
          }

          const existingItem = state.cart.items.find(item => item.productId === productId);
          
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            const newItem: CartItem = {
              id: `item-${Date.now()}`,
              cartId: state.cart.id,
              productId,
              quantity,
              price: product.price,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              product
            };
            state.cart.items.push(newItem);
          }

          // Recalculate total
          state.cart.totalPrice = state.cart.items.reduce(
            (total, item) => total + (item.price * item.quantity), 0
          );
          
          state.isLoading = false;
          state.isOpen = true;
        });

        toast.success('Item added to cart!');
      } catch (error: any) {
        set((state) => {
          state.error = 'Failed to add item to cart';
          state.isLoading = false;
        });
        
        toast.error('Failed to add item to cart');
        throw error;
      }
    },

    updateCartItem: async (productId: string, quantity: number) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        set((state) => {
          if (state.cart) {
            const item = state.cart.items.find(item => item.productId === productId);
            if (item) {
              item.quantity = quantity;
              item.updatedAt = new Date().toISOString();
              
              // Recalculate total
              state.cart.totalPrice = state.cart.items.reduce(
                (total, item) => total + (item.price * item.quantity), 0
              );
            }
          }
          state.isLoading = false;
        });

        toast.success('Cart updated!');
      } catch (error: any) {
        set((state) => {
          state.error = 'Failed to update cart item';
          state.isLoading = false;
        });
        
        toast.error('Failed to update cart item');
        throw error;
      }
    },

    removeFromCart: async (productId: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        set((state) => {
          if (state.cart) {
            state.cart.items = state.cart.items.filter(item => item.productId !== productId);
            
            // Recalculate total
            state.cart.totalPrice = state.cart.items.reduce(
              (total, item) => total + (item.price * item.quantity), 0
            );
          }
          state.isLoading = false;
        });

        toast.success('Item removed from cart!');
      } catch (error: any) {
        set((state) => {
          state.error = 'Failed to remove item from cart';
          state.isLoading = false;
        });
        
        toast.error('Failed to remove item from cart');
        throw error;
      }
    },

    clearCart: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        set((state) => {
          if (state.cart) {
            state.cart.items = [];
            state.cart.totalPrice = 0;
          }
          state.isLoading = false;
        });

        toast.success('Cart cleared!');
      } catch (error: any) {
        set((state) => {
          state.error = 'Failed to clear cart';
          state.isLoading = false;
        });
        
        toast.error('Failed to clear cart');
        throw error;
      }
    },

    validateCart: async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        return { isValid: true, issues: [] };
      } catch (error: any) {
        toast.error('Failed to validate cart');
        throw error;
      }
    },

    openCart: () => {
      set((state) => {
        state.isOpen = true;
      });
    },

    closeCart: () => {
      set((state) => {
        state.isOpen = false;
      });
    },

    toggleCart: () => {
      set((state) => {
        state.isOpen = !state.isOpen;
      });
    },

    clearError: () => {
      set((state) => {
        state.error = null;
      });
    },
    })),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart })
    }
  )
);

// Computed values
export const useCartItemCount = () => {
  return useCartStore((state) => 
    state.cart?.items.reduce((total, item) => total + item.quantity, 0) || 0
  );
};

export const useCartTotal = () => {
  return useCartStore((state) => state.cart?.totalPrice || 0);
};