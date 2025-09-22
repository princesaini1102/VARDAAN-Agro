'use client';

export function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              About Vardaan Agro Farm
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              We are committed to providing the finest organic products grown with sustainable farming practices. 
              Our farm has been serving communities for over 20 years with fresh, healthy, and chemical-free produce.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>100% Organic Certified</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Sustainable Farming Practices</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Farm-to-Table Freshness</span>
              </div>
            </div>
          </div>
          <div className="bg-green-100 rounded-lg p-8 text-center">
            <div className="text-8xl mb-4">🚜</div>
            <p className="text-gray-600">Sustainable farming since 2003</p>
          </div>
        </div>
      </div>
    </section>
  );
}