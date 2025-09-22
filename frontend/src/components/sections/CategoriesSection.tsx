'use client';

import { useState } from 'react';
import { ArrowRight, Leaf, Heart, Zap, Shield } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  productCount: number;
  image: string;
  icon: React.ElementType;
  color: string;
  benefits: string[];
}

const categories: Category[] = [
  {
    id: 1,
    name: "Fresh Mushrooms",
    description: "Daily harvested, farm-fresh mushrooms perfect for cooking",
    productCount: 12,
    image: "/images/fresh-mushrooms.jpg",
    icon: Leaf,
    color: "from-green-400 to-green-600",
    benefits: ["Farm Fresh", "Daily Harvest", "Premium Quality"]
  },
  {
    id: 2,
    name: "Medicinal Mushrooms",
    description: "Therapeutic mushrooms known for their health benefits",
    productCount: 8,
    image: "/images/medicinal-mushrooms.jpg",
    icon: Heart,
    color: "from-red-400 to-red-600",
    benefits: ["Health Boost", "Natural Healing", "Immunity Support"]
  },
  {
    id: 3,
    name: "Exotic Varieties",
    description: "Rare and unique mushroom varieties for gourmet cooking",
    productCount: 6,
    image: "/images/exotic-mushrooms.jpg",
    icon: Zap,
    color: "from-purple-400 to-purple-600",
    benefits: ["Gourmet Quality", "Unique Flavors", "Chef's Choice"]
  },
  {
    id: 4,
    name: "Organic Certified",
    description: "100% organic mushrooms with official certification",
    productCount: 15,
    image: "/images/organic-mushrooms.jpg",
    icon: Shield,
    color: "from-blue-400 to-blue-600",
    benefits: ["Certified Organic", "Chemical Free", "Sustainable"]
  }
];

export function CategoriesSection() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            Product Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Our Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From everyday cooking essentials to rare gourmet varieties, discover the perfect 
            mushrooms for every culinary adventure and health need.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-4"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Background Image */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Category Image</span>
                </div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                
                {/* Icon */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Product Count */}
                <div className="absolute top-6 right-6">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">
                      {category.productCount} Products
                    </span>
                  </div>
                </div>

                {/* Hover Content */}
                <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-all duration-300 ${
                  hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0">
                    <span>Explore Category</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2 mb-6">
                  {category.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-600 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group">
                  <span>View Products</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're constantly expanding our collection. Let us know what you need, 
              and we'll do our best to source it for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                Request Custom Order
              </button>
              <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}