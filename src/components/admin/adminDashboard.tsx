import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';

interface Email {
  email: string;
  subscribedAt: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useUser();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const adminEmail = 'rakhangezaid10@gmail.com'; 

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress !== adminEmail) {
      setError('Access denied');
      setLoading(false);
      return;
    }

    const fetchEmails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/newsletter/emails');
        const data = await response.json();
        setEmails(data);
      } catch (error) {
        setError('Failed to fetch emails');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-black text-white">
      <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-black text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.email}>
                <td className="border px-4 py-2">{email.email}</td>
                <td className="border px-4 py-2">{new Date(email.subscribedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;