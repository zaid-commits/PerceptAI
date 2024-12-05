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
    <div className="p-4 rounded-lg text-center">
      <h2 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-2 rounded-l-lg font-semibold text-purple-800 border border-gray-300 text-lg"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white p-2 rounded-r-lg hover:bg-purple-700 transition duration-300 text-lg"
        >
          Subscribe
        </button>
      </form>
      {success && <p className="text-green-500 mt-2 text-lg">Thanks for Subscribing to our Newsletter!</p>}
      {error && <p className="text-red-500 mt-2 text-lg">{error}</p>}
    </div>
  );
};

export default NewsletterSubscription;
