import { Metadata } from 'next';
import { ProductsPage } from '@/components/pages/ProductsPage';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore our premium collection of organic mushrooms. Fresh, sustainable, and delivered to your doorstep.',
};

export default function Products() {
  return <ProductsPage />;
}