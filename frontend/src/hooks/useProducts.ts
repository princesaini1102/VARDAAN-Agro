import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '@/lib/api';
import { queryKeys } from '@/lib/queryClient';
import { Product, ProductFilters } from '@/types';
import { toast } from 'react-hot-toast';

// Get all products with filters
export const useProducts = (filters?: ProductFilters & { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: queryKeys.products.list(filters || {}),
    queryFn: () => productApi.getAll(filters),
    select: (data) => data.data,
  });
};

// Get single product by ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productApi.getById(id),
    select: (data) => data.data.data as Product,
    enabled: !!id,
  });
};

// Get featured products
export const useFeaturedProducts = (limit?: number) => {
  return useQuery({
    queryKey: queryKeys.products.featured(),
    queryFn: () => productApi.getFeatured(limit),
    select: (data) => data.data.data as Product[],
  });
};

// Get related products
export const useRelatedProducts = (productId: string, categoryId: string, limit?: number) => {
  return useQuery({
    queryKey: queryKeys.products.related(productId, categoryId),
    queryFn: () => productApi.getRelated(productId, categoryId, limit),
    select: (data) => data.data.data as Product[],
    enabled: !!productId && !!categoryId,
  });
};

// Search products
export const useSearchProducts = (query: string, limit?: number) => {
  return useQuery({
    queryKey: queryKeys.products.search(query),
    queryFn: () => productApi.search(query, limit),
    select: (data) => data.data.data as Product[],
    enabled: !!query && query.length > 2,
  });
};

// Create product mutation (Admin only)
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: any) => productApi.create(productData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success('Product created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create product');
    },
  });
};

// Update product mutation (Admin only)
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => productApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.id) });
      toast.success('Product updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update product');
    },
  });
};

// Delete product mutation (Admin only)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      toast.success('Product deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    },
  });
};

// Update stock mutation (Admin only)
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      id, 
      quantity, 
      operation 
    }: { 
      id: string; 
      quantity: number; 
      operation: 'add' | 'subtract' 
    }) => productApi.updateStock(id, quantity, operation),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.products.detail(variables.id) });
      toast.success('Stock updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update stock');
    },
  });
};