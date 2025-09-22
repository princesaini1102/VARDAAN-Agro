'use client';

export function HeroSection() {
  return (
    <section 
      className="relative py-20 min-h-screen flex items-center"
      style={{
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Vardaan Agro Farm
        </h1>
        <p className="text-2xl text-yellow-300 mb-8 drop-shadow-md">
          Organic & Medicinal Mushrooms
        </p>
        <p className="text-lg text-white max-w-2xl mx-auto mb-12 drop-shadow-md">
          Premium organic mushrooms delivered fresh from our farm to your doorstep.
        </p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg">
          Shop Now
        </button>
      </div>
    </section>
  );
}