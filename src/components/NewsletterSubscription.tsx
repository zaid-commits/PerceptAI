import React, { useState } from 'react';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate an API call
    try {
      // Replace with your API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email) {
            resolve('Success');
          } else {
            reject('Error');
          }
        }, 1000);
      });
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg text-center">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Subscribe to our Newsletter</h2>
      <p className="text-gray-400 mb-4">Stay updated with the latest news and updates.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-2 rounded-l-lg font-semibold text-purple-800 border border-gray-300"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700 transition duration-300"
        >
          Subscribe
        </button>
      </form>
      {success && <p className="text-green-500 mt-4">Thanks for Subscribing!</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default NewsletterSubscription;