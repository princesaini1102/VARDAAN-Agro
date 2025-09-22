'use client';

export function NewsletterSection() {
  return (
    <section className="py-20 bg-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Stay Updated
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Subscribe to our newsletter for the latest organic products and farming tips.
        </p>
        <div className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800"
          />
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}