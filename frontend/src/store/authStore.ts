import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { authApi, setTokens, clearTokens } from '@/lib/api';
import { User, AuthTokens, RegisterForm } from '@/types';
import { toast } from 'react-hot-toast';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterForm) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setUser: (user: User) => void;
  setTokens: (tokens: AuthTokens) => void;
  clearError: () => void;
  initialize: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const response = await authApi.login({ email, password });
          const { user, tokens } = response.data.data;

          set((state) => {
            state.user = user;
            state.tokens = tokens;
            state.isAuthenticated = true;
            state.isLoading = false;
          });

          setTokens(tokens);
          toast.success('Login successful!');
        } catch (error: any) {
          set((state) => {
            state.error = error.response?.data?.message || 'Login failed';
            state.isLoading = false;
          });
          throw error;
        }
      },

      register: async (userData: RegisterForm) => {
        set((state) => {
          state.isLoading = true;
          state.error = null;
        });

        try {
          const { confirmPassword, ...registerData } = userData;
          const response = await authApi.register(registerData);
          const { user, tokens } = response.data.data;

          set((state) => {
            state.user = user;
            state.tokens = tokens;
            state.isAuthenticated = true;
            state.isLoading = false;
          });

          setTokens(tokens);
          toast.success('Registration successful!');
        } catch (error: any) {
          set((state) => {
            state.error = error.response?.data?.message || 'Registration failed';
            state.isLoading = false;
          });
          throw error;
        }
      },

      logout: async () => {
        const { tokens } = get();
        
        try {
          if (tokens?.refreshToken) {
            await authApi.logout(tokens.refreshToken);
          }
        } catch (error) {
          console.error('Logout API call failed:', error);
        } finally {
          set((state) => {
            state.user = null;
            state.tokens = null;
            state.isAuthenticated = false;
            state.error = null;
          });

          clearTokens();
          toast.success('Logged out successfully');
        }
      },

      refreshToken: async () => {
        const { tokens } = get();
        
        if (!tokens?.refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const response = await authApi.refreshToken(tokens.refreshToken);
          const newTokens = response.data.data.tokens;

          set((state) => {
            state.tokens = newTokens;
          });

          setTokens(newTokens);
        } catch (error) {
          // Refresh failed, logout user
          get().logout();
          throw error;
        }
      },

      setUser: (user: User) => {
        set((state) => {
          state.user = user;
        });
      },

      setTokens: (tokens: AuthTokens) => {
        set((state) => {
          state.tokens = tokens;
          state.isAuthenticated = true;
        });
        setTokens(tokens);
      },

      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      initialize: async () => {
        const { tokens } = get();
        
        if (tokens?.accessToken) {
          try {
            const response = await authApi.getProfile();
            const user = response.data.data.user;

            set((state) => {
              state.user = user;
              state.isAuthenticated = true;
            });
          } catch (error) {
            // Token might be expired, try to refresh
            try {
              await get().refreshToken();
              const response = await authApi.getProfile();
              const user = response.data.data.user;

              set((state) => {
                state.user = user;
                state.isAuthenticated = true;
              });
            } catch (refreshError) {
              // Both access and refresh tokens are invalid
              get().logout();
            }
          }
        }
      },
    })),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);