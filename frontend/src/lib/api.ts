import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
let accessToken: string | null = null;
let refreshToken: string | null = null;

export const setTokens = (tokens: { accessToken: string; refreshToken: string }) => {
  accessToken = tokens.accessToken;
  refreshToken = tokens.refreshToken;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }
};

export const clearTokens = () => {
  accessToken = null;
  refreshToken = null;
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
};

export const getTokens = () => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
  }
  return { accessToken, refreshToken };
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const tokens = getTokens();
    if (tokens.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = getTokens();
        if (tokens.refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {
            refreshToken: tokens.refreshToken,
          });

          const newTokens = response.data.data.tokens;
          setTokens(newTokens);

          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        clearTokens();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/api/auth/login', credentials),
  
  register: (userData: any) =>
    api.post('/api/auth/register', userData),
  
  logout: (refreshToken: string) =>
    api.post('/api/auth/logout', { refreshToken }),
  
  refreshToken: (refreshToken: string) =>
    api.post('/api/auth/refresh', { refreshToken }),
  
  getProfile: () =>
    api.get('/api/auth/profile'),
  
  updateProfile: (data: any) =>
    api.put('/api/auth/profile', data),
};

export const categoryApi = {
  getAll: () =>
    api.get('/api/categories'),
  
  getById: (id: string) =>
    api.get(`/api/categories/${id}`),
  
  create: (data: any) =>
    api.post('/api/categories', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/categories/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/api/categories/${id}`),
};

export const productApi = {
  getAll: (params?: any) =>
    api.get('/api/products', { params }),
  
  getById: (id: string) =>
    api.get(`/api/products/${id}`),
  
  getFeatured: (limit?: number) =>
    api.get('/api/products/featured', { params: { limit } }),

  getRelated: (productId: string, categoryId: string, params?: any) =>
    api.get(`/api/products/${productId}/related`, { params }),

  getByCategory: (categoryId: string, params?: any) =>
    api.get(`/api/products/category/${categoryId}`, { params }),
  
  search: (query: string, params?: any) =>
    api.get('/api/products/search', { params: { q: query, ...params } }),
  
  create: (data: any) =>
    api.post('/api/products', data),
  
  update: (id: string, data: any) =>
    api.put(`/api/products/${id}`, data),
  updateStock: (id: string, quantity: number, operation: 'add' | 'subtract') =>
    api.patch(`/api/products/${id}/stock`, { quantity, operation }),
  
  delete: (id: string) =>
    api.delete(`/api/products/${id}`),
};

export const cartApi = {
  get: () =>
    api.get('/api/cart'),
  
  addItem: (productId: string, quantity: number) =>
    api.post('/api/cart/items', { productId, quantity }),
  add: (productId: string, quantity: number) =>
    api.post('/api/cart/items', { productId, quantity }),

  update: (productId: string, quantity: number) =>
    api.put(`/api/cart/items/${productId}`, { quantity }),

  updateItem: (productId: string, quantity: number) =>
    api.put(`/api/cart/items/${productId}`, { quantity }),
  
  removeItem: (productId: string) =>
    api.delete(`/api/cart/items/${productId}`),
  remove: (productId: string) =>
    api.delete(`/api/cart/items/${productId}`),
  
  clear: () =>
    api.delete('/api/cart'),
  
  validate: () =>
    api.get('/api/cart/validate'),
};

export const orderApi = {
  getAll: (params?: any) =>
    api.get('/api/orders', { params }),
  
  getMyOrders: (params?: any) =>
    api.get('/api/orders/my-orders', { params }),
  
  getById: (id: string) =>
    api.get(`/api/orders/${id}`),
  
  create: (shippingInfo: any) =>
    api.post('/api/orders', { shippingInfo }),
  
  updateStatus: (id: string, status: string, trackingId?: string) =>
    api.patch(`/api/orders/${id}/status`, { status, trackingId }),
};

export const reviewApi = {
  getProductReviews: (productId: string, params?: any) =>
    api.get(`/api/reviews/product/${productId}`, { params }),
  
  create: (productId: string, data: any) =>
    api.post(`/api/reviews/product/${productId}`, data),
  
  update: (id: string, data: any) =>
    api.put(`/api/reviews/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/api/reviews/${id}`),
};

export default api;