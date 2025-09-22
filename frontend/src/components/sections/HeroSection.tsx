'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Play, Leaf, Award, Truck } from 'lucide-react';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Premium Organic Mushrooms",
      subtitle: "Farm Fresh • Naturally Grown • Delivered Daily",
      description: "Experience the finest quality mushrooms, cultivated with care using sustainable farming practices.",
      cta: "Shop Mushrooms",
      image: "/images/background.png"
    },
    {
      title: "Sustainable Agriculture",
      subtitle: "Eco-Friendly • Chemical-Free • Pure Organic",
      description: "Supporting local communities while delivering the healthiest produce to your table.",
      cta: "Learn More",
      image: "/images/image6.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-green-600/20 text-green-300 rounded-full text-sm font-medium backdrop-blur-sm">
              <Leaf className="w-4 h-4 mr-2" />
              100% Organic Certified
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-xl md:text-2xl text-green-300 mb-4 font-medium">
            {slides[currentSlide].subtitle}
          </p>
          
          <p className="text-lg text-gray-200 max-w-2xl mb-8 leading-relaxed">
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="group bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {slides[currentSlide].cta}
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center border border-white/20">
              <Play className="mr-2 w-5 h-5" />
              Watch Our Story
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-white/90">
              <div className="bg-green-600/20 p-3 rounded-full backdrop-blur-sm">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-gray-300">Certified organic produce</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-white/90">
              <div className="bg-green-600/20 p-3 rounded-full backdrop-blur-sm">
                <Truck className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-gray-300">Same day delivery available</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-white/90">
              <div className="bg-green-600/20 p-3 rounded-full backdrop-blur-sm">
                <Leaf className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold">Eco-Friendly</h3>
                <p className="text-sm text-gray-300">Sustainable farming practices</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-green-400 w-8' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}