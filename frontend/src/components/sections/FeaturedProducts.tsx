'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isOrganic: boolean;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Oyster Mushrooms",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 124,
    image: "/images/image4.png",
    category: "Fresh Mushrooms",
    isOrganic: true,
    inStock: true
  },
  {
    id: 2,
    name: "Shiitake Mushrooms",
    price: 449,
    originalPrice: 549,
    rating: 4.9,
    reviews: 89,
    image: "/images/image2.png",
    category: "Premium Mushrooms",
    isOrganic: true,
    inStock: true
  },
  {
    id: 3,
    name: "Button Mushrooms",
    price: 199,
    rating: 4.7,
    reviews: 156,
    image: "/images/image5.png",
    category: "Fresh Mushrooms",
    isOrganic: true,
    inStock: true
  },
  {
    id: 4,
    name: "Lion&apos;s Mane",
    price: 599,
    originalPrice: 699,
    rating: 4.9,
    reviews: 67,
    image: "/images/image3.png",
    category: "Medicinal Mushrooms",
    isOrganic: true,
    inStock: false
  }
];

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Fresh From Our Farm
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our premium selection of organic mushrooms, carefully cultivated 
            and harvested at peak freshness for maximum flavor and nutrition.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isOrganic && (
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Organic
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Sale
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors shadow-lg">
                    <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-green-600 font-medium">{product.category}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">per kg</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    product.inStock
                      ? 'bg-green-600 text-white hover:bg-green-700 transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/products" className="inline-block bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}