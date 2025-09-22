'use client';

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Featured Products
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🥬</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Organic Product {i}</h3>
              <p className="text-gray-600 mb-4">Fresh and healthy organic produce</p>
              <p className="text-2xl font-bold text-green-600">₹{i * 50}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}