'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Award, Users, Leaf, TrendingUp } from 'lucide-react';
import { AIChat } from '../features/AIChat';

const stats = [
  { icon: Users, label: "Happy Customers", value: "10,000+", color: "text-blue-600" },
  { icon: Award, label: "Years Experience", value: "15+", color: "text-green-600" },
  { icon: Leaf, label: "Organic Products", value: "50+", color: "text-emerald-600" },
  { icon: TrendingUp, label: "Growth Rate", value: "200%", color: "text-purple-600" }
];

const team = [
  { name: "Aarav Sharma", role: "Founder & CEO" },
  { name: "Priya Verma", role: "Head of Operations" },
  { name: "Vikram Singh", role: "Sustainability Manager" }
];

const values = [
  { title: "Quality", description: "We are dedicated to growing mushrooms of the highest quality, ensuring they meet our rigorous standards for taste, texture, and nutritional value." },
  { title: "Sustainability", description: "We embrace sustainable farming practices that protect the environment and promote the long-term health of our land." },
  { title: "Integrity", description: "We operate with transparency and honesty, building trust with our customers and partners." },
  { title: "Community", description: "We are passionate about supporting our local community, fostering relationships with farmers, suppliers, and customers." },
  { title: "Innovation", description: "We continuously seek new and improved ways to grow mushrooms, enhance our processes, and deliver exceptional products." }
];

export function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About VARDAAN Agro Farm
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At VARDAAN Agro Farm, our journey began with a simple passion: to cultivate the finest mushrooms and share their incredible benefits with the world. Nestled in the heart of the countryside, our farm is a testament to sustainable agriculture and a deep respect for nature&apos;s bounty.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Our mission is to provide our customers with the freshest, most delicious mushrooms while promoting sustainable farming practices. We are committed to minimizing our environmental impact, from using eco-friendly packaging to employing innovative techniques that conserve water and energy.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We strive to educate our community about the health benefits of mushrooms and inspire a love for wholesome, natural foods.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl h-80 flex items-center justify-center">
                <span className="text-green-600 text-lg font-medium">Farm Image</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do at VARDAAN Agro Farm
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-green-600 text-2xl mb-4">✓</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet the Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate people behind VARDAAN Agro Farm
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-40 h-40 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-2xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-green-600 font-medium">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-green-200" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-green-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Farming Process</h2>
              </div>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Controlled Environment</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our mushrooms are grown in a controlled environment, mimicking their natural habitat to ensure optimal growth. We use a blend of organic substrates, carefully monitoring temperature, humidity, and light to create the perfect conditions.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability Initiatives</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We are committed to sustainability in every aspect of our operations. Our initiatives include eco-friendly packaging, water conservation, renewable energy utilization, waste reduction through composting, and local sourcing to support our community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              We&apos;d love to hear from you! If you have any questions, comments, or feedback, please don&apos;t hesitate to reach out.
            </p>
            <a 
              href="mailto:support@vardaangrofarm.com"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <AIChat />
      <Footer />
    </>
  );
}