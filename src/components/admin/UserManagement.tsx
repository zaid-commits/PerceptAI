import React, { useState, useEffect } from 'react';
import FloatingNavbar from '../Section1/Navbar/Navbar';

const UserManagement = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('/api/emails'); // Updated endpoint
        const data = await response.json();
        setSubscribers(data);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
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
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center text-purple-500 mb-4">Newsletter Subscribers</h2>
            <ul className="list-disc list-inside text-gray-300">
              {subscribers.map((subscriber, index) => (
                <li key={index}>{subscriber.email}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;