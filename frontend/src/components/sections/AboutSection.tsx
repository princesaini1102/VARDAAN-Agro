'use client';

import { useState } from 'react';
import { Users, Award, Leaf, TrendingUp, Play } from 'lucide-react';

const stats = [
  { icon: Users, label: "Happy Customers", value: "10,000+", color: "text-blue-600" },
  { icon: Award, label: "Years Experience", value: "15+", color: "text-green-600" },
  { icon: Leaf, label: "Organic Products", value: "50+", color: "text-emerald-600" },
  { icon: TrendingUp, label: "Growth Rate", value: "200%", color: "text-purple-600" }
];

const features = [
  {
    title: "Sustainable Farming",
    description: "We use eco-friendly practices that protect the environment while producing the highest quality mushrooms.",
    icon: "🌱"
  },
  {
    title: "Quality Assurance",
    description: "Every batch is carefully tested and monitored to ensure premium quality and safety standards.",
    icon: "✅"
  },
  {
    title: "Fresh Delivery",
    description: "From our farm to your table within 24 hours, maintaining peak freshness and nutritional value.",
    icon: "🚚"
  }
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              About Vardaan Agro
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Growing Excellence Since 2008
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              At Vardaan Agro Farm, we're passionate about cultivating the finest organic mushrooms 
              using sustainable farming practices that benefit both our customers and the environment.
            </p>

            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
              {[
                { id: 'story', label: 'Our Story' },
                { id: 'mission', label: 'Mission' },
                { id: 'values', label: 'Values' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {activeTab === 'story' && (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Founded in 2008 by agricultural enthusiasts, Vardaan Agro Farm began as a small 
                    family operation with a vision to provide fresh, organic mushrooms to local communities.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Today, we've grown into a leading supplier of premium mushrooms, serving thousands 
                    of customers while maintaining our commitment to quality and sustainability.
                  </p>
                </div>
              )}
              
              {activeTab === 'mission' && (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Our mission is to revolutionize mushroom farming through innovative, sustainable 
                    practices that deliver exceptional quality while protecting our planet.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    We strive to make organic, nutritious mushrooms accessible to everyone while 
                    supporting local communities and promoting environmental stewardship.
                  </p>
                </div>
              )}
              
              {activeTab === 'values' && (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Quality:</strong> We never compromise on the quality of our products, 
                    ensuring every mushroom meets our rigorous standards.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Sustainability:</strong> Environmental responsibility is at the core 
                    of everything we do, from farming to packaging.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Innovation:</strong> We continuously invest in research and technology 
                    to improve our farming methods and product quality.
                  </p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                Learn More About Us
              </button>
              <button className="flex items-center justify-center space-x-2 border-2 border-green-600 text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
                <Play className="w-5 h-5" />
                <span>Watch Our Story</span>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Image Placeholder */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl h-80 flex items-center justify-center">
                <span className="text-green-600 text-lg font-medium">Farm Image</span>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Certified Organic</p>
                    <p className="text-sm text-gray-600">ISO 9001:2015</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Vardaan Agro?</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering excellence in every aspect of our business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-100 transition-colors duration-300">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}