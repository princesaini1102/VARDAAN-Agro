import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AIChat } from '@/components/features/AIChat';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Vardaan Agro Farm - Your trusted source for premium organic products. Fresh vegetables, fruits, grains, and organic fertilizers delivered from our farm to your doorstep.',
  openGraph: {
    title: 'Vardaan Agro Farm - Pure Organic, Pure Health',
    description: 'Premium organic products delivered fresh from our farm to your doorstep. Experience the purity of organic farming with Vardaan Agro.',
    images: [
      {
        url: '/images/hero-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Vardaan Agro Farm - Organic Products',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section with 3D Elements */}
        <HeroSection />
        
        {/* Featured Products */}
        <FeaturedProducts />
        
        {/* Categories Showcase */}
        <CategoriesSection />
        
        {/* About Us */}
        <AboutSection />
        
        {/* Customer Testimonials */}
        <TestimonialsSection />
        
        {/* Newsletter Signup */}
        <NewsletterSection />
      </main>
      
      {/* AI Chatbot */}
      <AIChat />
      
      <Footer />
    </>
  );
}