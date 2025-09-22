// User types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'ADMIN' | 'CUSTOMER' | 'GUEST';
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: string;
  sku: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isOrganic: boolean;
  isActive: boolean;
  rating?: number;
  reviewCount: number;
  model3D?: string;
  createdAt: string;
  updatedAt: string;
  category?: Category;
}

// Cart types
export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export interface Cart {
  id: string;
  userId: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  items: CartItem[];
}

// Order types
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  product: {
    id: string;
    name: string;
    images: string[];
  };
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  trackingId?: string;
  estimatedDate?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

// Review types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment?: string;
  images?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any[];
}

// Form types
export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isOrganic?: boolean;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Store types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}