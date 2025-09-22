'use client';

import { AIChat } from '@/components/features/AIChat';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Search } from 'lucide-react';

const featuredArticle = {
  category: "Health & Nutrition",
  date: "July 19, 2024",
  title: "The Health Benefits of Mushrooms",
  description: "Explore the nutritional advantages of incorporating mushrooms into your diet, from boosting immunity to improving heart health.",
  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA11E5jTC3QcMR6YigfgLcEvWK9FWKmJnvB9Lemp88xnZGqKk9q0CERjDCJLJLjFjBy5hr2jcURHCqKfhe3bC4cFxV8OnKlgrRpeQZN9kBffAvvPwsW8CaBV6_JR4T3lGL45NTT51u2fzB2lmbgF3i7WpRJpSxu0PKIfGpA7tGY-YL5bQCcYlGdJCvOl_eJoMgdmIZ3XxQ_sAVTnsq_RYVw632T1yPkt2oggIqZoyyAbQWhl4WgeK_u9UVmElOxk38EC5xvNK4_yek"
};

const recentPosts = [
  {
    category: "Growing Tips",
    date: "July 15, 2024",
    title: "Growing Mushrooms at Home: A Beginner's Guide",
    description: "Learn the basics of cultivating your own mushrooms with our step-by-step guide, perfect for beginners.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOTffVZ4cp90m-USNRss3k0c2IAToYeRBNyO4clLIdYr7ZGmyvKGyKxoTOh-YUMOEq0P0fr0myJ3QAdx6CwXy6JIdjGImmdgtC63RfwmtpLi7gfJZpt-Tim-Jg7NzID1y0ltJ7-_2ZHKNhHFnPmgpvFlV-lOPcvNkabl-AhRIKXCw6tNx3mNtOHguoOy3OjhPov22Bx8EQ2wnmKRf8rKE0ETMBi29NPKKm8Cx6iF8zRgWU9_B2QMo_gNQLrdq0MDGUndey-MEmcEQ"
  },
  {
    category: "Recipes",
    date: "July 12, 2024",
    title: "Mushroom Recipes: Delicious and Healthy Dishes",
    description: "Discover a variety of mouth-watering recipes featuring different types of mushrooms.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5wJSHbwziGZatjj0M5Vqam5e-sy405116oPkjAlDrOCqV2FEiRVJMTY8b2W8lCSxcZWTBJ0zz1-4tFYUY5xDLgaJXbPzy7EYgZGLSB6icseF9MpCM9Vw0Cg8O4ztmsJ9ZU4Ti68UTfjTQXgaRlOAmoEL0g2Kj2vD5vBoDgRaap3N1p1JgArvT9Qh6mPpvyq506JzEH2XrTzM_7vsinQ245B0G91RNLBcL_x3LRIWgCYPlvEmihMkxQ3jYjRmOWDQKhN7KTgPVVD0"
  },
  {
    category: "Culture",
    date: "July 8, 2024",
    title: "The History and Culture of Mushrooms",
    description: "Delve into the rich history and cultural significance of mushrooms across different societies.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUopJc974SBDQyaU7c_8D7lRCXvo0BkAjjsnnL2GQ1MfPq8IT-npIkkjVDfP-ZwUlxPtxnq-xzNqHyLWo7QORkQ0OvF3_qfjUv--BQ6hQUoXrer82j55Raw67y4JMWhvHJTRpURrfBPekjosgumR5nEqByS0FYXaKyfT3pMtBLupt0FC4X8pJrnpisc2hkwaJkaFFnUflg8Zzj1cQT1iExZU5gfEt5I5_tNM3puCasg71oxviJFXXMhdiUL_kZfqe_Z1Oia4c8g9g"
  }
];

const categories = ["Growing Tips", "Recipes", "Health", "Company News"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <Header/>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog & News
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, tips, and insights from VARDAAN Agro Farm.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-lg mx-auto">
          <div className="relative">
            <input
              className="w-full h-12 pl-12 pr-4 rounded-full bg-white border border-gray-200 focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
              placeholder="Search articles..."
              type="search"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>

        {/* Featured Article */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
            <div 
              className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
              style={{ backgroundImage: `url("${featuredArticle.image}")` }}
            />
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <p className="text-sm text-gray-500 mb-2">
                {featuredArticle.category} • {featuredArticle.date}
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {featuredArticle.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {featuredArticle.description}
              </p>
              <button className="inline-block bg-green-600 text-white font-bold py-2 px-6 rounded-full self-start hover:bg-green-700 transition-colors">
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url("${post.image}")` }}
                />
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.category} • {post.date}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 flex-grow mb-4">
                    {post.description}
                  </p>
                  <button className="font-bold text-green-600 hover:underline self-start">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="bg-green-100 text-green-700 font-medium py-2 px-5 rounded-full hover:bg-green-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      </main>
      <AIChat/>
      <Footer/>
    </div>
  );
}