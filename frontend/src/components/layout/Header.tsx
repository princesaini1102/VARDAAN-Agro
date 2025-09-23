'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-green-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image 
                src="/images/brand_logo.png" 
                fill 
                alt="Vardaan Agro Farm Logo"
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-green-700 group-hover:text-green-600 transition-colors">
              VARDAAN Agro Farm
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
              <User size={20} />
            </button>
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
              Shop Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium">
                Products
              </Link>
              <Link href="/#about" className="text-gray-700 hover:text-green-600 font-medium">
                About
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-green-600 font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium">
                Contact
              </Link>
              <div className="flex items-center justify-between pt-4 border-t border-green-100">
                <div className="flex space-x-4">
                  <button className="p-2 text-gray-600">
                    <Search size={20} />
                  </button>
                  <button className="p-2 text-gray-600">
                    <User size={20} />
                  </button>
                  <button className="relative p-2 text-gray-600">
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
                  Shop Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}