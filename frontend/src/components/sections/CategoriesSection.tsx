'use client';

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Our Categories
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Vegetables', icon: '🥕' },
            { name: 'Fruits', icon: '🍎' },
            { name: 'Grains', icon: '🌾' },
            { name: 'Fertilizers', icon: '🌱' }
          ].map((category) => (
            <div key={category.name} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-6xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}