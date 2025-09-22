import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { cartApi } from '@/lib/api';
import { Cart } from '@/types';
import { toast } from 'react-hot-toast';

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
        const response = await cartApi.get();
        const cart = response.data.data;

        set((state) => {
          state.cart = cart;
          state.isLoading = false;
        });
      } catch (error: any) {
        set((state) => {
          state.error = error.response?.data?.message || 'Failed to fetch cart';
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
        const response = await cartApi.add(productId, quantity);
        
        // Refresh cart after adding item
        await get().fetchCart();
        
        set((state) => {
          state.isLoading = false;
          state.isOpen = true; // Open cart drawer after adding item
        });

        toast.success('Item added to cart!');
      } catch (error: any) {
        set((state) => {
          state.error = error.response?.data?.message || 'Failed to add item to cart';
          state.isLoading = false;
        });
        
        toast.error(error.response?.data?.message || 'Failed to add item to cart');
        throw error;
      }
    },

    updateCartItem: async (productId: string, quantity: number) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await cartApi.update(productId, quantity);
        
        // Refresh cart after updating item
        await get().fetchCart();
        
        set((state) => {
          state.isLoading = false;
        });

        toast.success('Cart updated!');
      } catch (error: any) {
        set((state) => {
          state.error = error.response?.data?.message || 'Failed to update cart item';
          state.isLoading = false;
        });
        
        toast.error(error.response?.data?.message || 'Failed to update cart item');
        throw error;
      }
    },

    removeFromCart: async (productId: string) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await cartApi.remove(productId);
        
        // Refresh cart after removing item
        await get().fetchCart();
        
        set((state) => {
          state.isLoading = false;
        });

        toast.success('Item removed from cart!');
      } catch (error: any) {
        set((state) => {
          state.error = error.response?.data?.message || 'Failed to remove item from cart';
          state.isLoading = false;
        });
        
        toast.error(error.response?.data?.message || 'Failed to remove item from cart');
        throw error;
      }
    },

    clearCart: async () => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });

      try {
        await cartApi.clear();
        
        set((state) => {
          state.cart = null;
          state.isLoading = false;
        });

        toast.success('Cart cleared!');
      } catch (error: any) {
        set((state) => {
          state.error = error.response?.data?.message || 'Failed to clear cart';
          state.isLoading = false;
        });
        
        toast.error(error.response?.data?.message || 'Failed to clear cart');
        throw error;
      }
    },

    validateCart: async () => {
      try {
        const response = await cartApi.validate();
        const validation = response.data.data;

        if (!validation.isValid) {
          toast.error('Some items in your cart have issues. Please review.');
        }

        return validation;
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
  }))
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