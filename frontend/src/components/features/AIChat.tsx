'use client';

import { useState } from 'react';

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50">
          <div className="bg-green-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">🤖 AI Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            <div className="bg-gray-100 rounded-lg p-3 mb-4">
              <p className="text-sm">
                Hello! I'm your AI farming assistant. How can I help you with organic products today?
              </p>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}