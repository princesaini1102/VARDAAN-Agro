'use client';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🌱 VARDAAN Agro Farm</h3>
            <p className="text-gray-400">
              Organic & Medicinal Mushrooms
            </p>
            <p className="text-gray-400">
              Your trusted source for premium organic products.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#" className="hover:text-white">Products</a></li>
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Vegetables</a></li>
              <li><a href="#" className="hover:text-white">Fruits</a></li>
              <li><a href="#" className="hover:text-white">Grains</a></li>
              <li><a href="#" className="hover:text-white">Fertilizers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p>📞 +91-9876543210</p>
              <p>📧 support@vardaanagro.com</p>
              <p>📍 Punjab, India</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Vardaan Agro Farm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}