import { useState, useEffect } from 'react';
import FloatingNavbar from '../Section1/Navbar/Navbar';

interface Subscriber {
  email: string;
  subscribedAt: string;
  _id: string;
}

const UserManagement = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('https://perceptai-nodejs.onrender.com/api/newsletter/emails');
        if (!response.ok) {
          throw new Error('Failed to fetch subscribers');
        }
        const data = await response.json();
        setSubscribers(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        setError('Failed to load subscribers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-300">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-purple-500 mb-4">
              Newsletter Subscribers ({subscribers.length})
            </h2>
            {subscribers.length === 0 ? (
              <p className="text-center text-gray-300">No subscribers yet.</p>
            ) : (
              <div className="max-w-2xl mx-auto">
                <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-800 text-left text-purple-500">Email</th>
                      <th className="px-6 py-3 border-b border-gray-800 text-left text-purple-500">Subscribed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-800">
                        <td className="px-6 py-4 border-b border-gray-800">{subscriber.email}</td>
                        <td className="px-6 py-4 border-b border-gray-800">
                          {new Date(subscriber.subscribedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;