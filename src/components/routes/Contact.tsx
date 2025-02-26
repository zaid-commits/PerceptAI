import React from 'react';
import FloatingNavbar from '../Navbar';
import Promo from '../promo';
import Footer from '../Footer';

const Contact: React.FC = () => {
  return (
    <div className="bg-[#000] text-white min-h-screen flex flex-col "data-scroll data-scroll-speed="2.0">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-36 flex-grow ">
        <h1 className="text-4xl font-bold text-center mb-16">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-16">
        
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-400 mb-4">
              If you have any questions, feel free to reach out to us using the contact <br /> form or the information below.
            </p>
            <ul className="space-y-2">
              <li>
                <strong>Address:</strong> 123 AI Street, Tech City, AI World
              </li>
              <li>
                <strong>Phone:</strong> +1 (123) 456-7890
              </li>
              <li>
                <strong>Email:</strong> contact@perceptai.com
              </li>
            </ul>
            <div className="border mt-5 h-auto p-5">
              <h1>map</h1>

            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 rounded bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-purple-800 hover:bg-purple-700 text-white py-3 rounded-lg transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Promo/>
      <Footer/>
    </div>
  );
};

export default Contact;
