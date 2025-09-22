'use client';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className=" flex items-center"><img src="/images/brand_logo.png" width="80" height="80" alt="" /></span>
            <span className="text-2xl font-bold text-green-600">VARDAAN Agro Farm</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-green-600">Home</a>
            <a href="/products" className="text-gray-700 hover:text-green-600">Products</a>
            <a href="/about" className="text-gray-700 hover:text-green-600">About</a>
            <a href="/contact" className="text-gray-700 hover:text-green-600">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-green-600">🛒</button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}