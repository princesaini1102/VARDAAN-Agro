'use client';

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Priya Singh', text: 'Best organic vegetables in town! Fresh and healthy.' },
            { name: 'Rajesh Kumar', text: 'Excellent quality and fast delivery. Highly recommended!' },
            { name: 'Meera Sharma', text: 'Love the organic fruits. My family is healthier now.' }
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="text-gray-600 mb-4">&quot;{testimonial.text}&quot;</p>
              <p className="font-semibold text-gray-800">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}