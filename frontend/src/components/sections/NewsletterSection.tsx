'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Gift, Bell, Truck } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Offers",
      description: "Get special discounts and early access to new products"
    },
    {
      icon: Bell,
      title: "Fresh Updates",
      description: "Be the first to know about seasonal mushrooms and recipes"
    },
    {
      icon: Truck,
      title: "Delivery Alerts",
      description: "Receive notifications about your orders and delivery updates"
    }
  ];

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to the Family! 🎉
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Thank you for subscribing! You&apos;ll receive your first newsletter with exclusive offers soon.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="bg-white/10 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mb-6">
              <Mail className="w-8 h-8" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Stay Fresh with Our Newsletter
            </h2>
            
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Join thousands of mushroom enthusiasts and get the latest updates, 
              exclusive offers, and fresh recipes delivered to your inbox.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-green-100 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Get 10% Off Your First Order
              </h3>
              <p className="text-gray-600">
                Subscribe now and receive an exclusive discount code
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Subscribe & Get 10% Off</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service. 
              Unsubscribe at any time.
            </p>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15K+</div>
                <div className="text-xs text-gray-500">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.9★</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-xs text-gray-500">Spam</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}