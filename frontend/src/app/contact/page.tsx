'use client';

import { useState } from 'react';
import { Clock, Phone, Mail, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AIChat } from '@/components/features/AIChat';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Header/>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-gray-900">
                  Get In Touch
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  We&apos;d love to hear from you. Fill out the form or use our contact details below.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    className="block w-full rounded border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 transition-colors px-3 py-2"
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    className="block w-full rounded border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 transition-colors px-3 py-2"
                    id="email"
                    placeholder="Enter your email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    className="block w-full rounded border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 transition-colors px-3 py-2"
                    id="subject"
                    placeholder="Enter the subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
                    Your Message
                  </label>
                  <textarea
                    className="block w-full rounded border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 transition-colors px-3 py-2"
                    id="message"
                    placeholder="Enter your message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <button
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded shadow-sm text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    type="submit"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column - Map & Contact Info */}
            <div className="space-y-12">
              {/* Map Section */}
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8!2d77.0!3d28.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin&q=821+gali+no.+4+Krishna+kunj+Nayagaon+Bhondsi,+Gurgaon,+Haryana+122102"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg backdrop-blur-sm">
                  <h3 className="font-bold text-gray-900">VARDAAN Agro Farm</h3>
                  <p className="text-sm text-gray-600">821 gali no. 4 Krishna kunj Nayagaon Bhondsi, Gurgaon, Haryana 122102</p>
                  <a 
                    href="https://www.google.com/maps/dir//821+gali+no.+4+Krishna+kunj+Nayagaon+Bhondsi,+Gurgaon,+Haryana+122102" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-green-600 hover:underline"
                  >
                    Get Directions <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 rounded-lg border border-gray-200 p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Clock className="mt-1 text-green-600" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Business Hours</h4>
                      <p className="text-gray-600">Monday - Friday: 9 AM - 6 PM</p>
                      <p className="text-gray-600">Saturday: 10 AM - 4 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 text-green-600" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+1-555-123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 text-green-600" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@vardaangrofarm.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <AIChat/>
      <Footer/>
    </div>
  );
}