import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FloatingNavbar from "../Section1/Navbar/Navbar";
import Newsletter from './NewsLetter';
import UserManagement from './UserManagement';
import Analytics from './Analytics';

const AdminDashboard: React.FC = () => {
  const cards = [
    { title: 'Newsletter', route: '/admin/newsletter', description: 'Deliver project insights to PerceptAI subscibers' },
    { title: 'User Management', route: '/admin/users', description: 'Manage your subscribers' },
    { title: 'Analytics', route: '/admin/analytics', description: 'View site analytics' },
    // { title: 'Dashboard', route: '/admin', description: 'Overview of admin functions' },
  ];

  return (
    <div className="wrapper bg-black py-16">
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-500 mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card, index) => (
            <Link to={card.route} key={index} className="block">
              <div className="bg-gray-900 border border-purple-500 rounded-lg p-4 hover:bg-gray-800 transition-colors cursor-pointer h-full">
                <h2 className="text-xl font-bold text-purple-500 mb-2">{card.title}</h2>
                <p className="text-gray-300">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <Routes>
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="/" element={<h2>Welcome to the Admin Dashboard</h2>} />
        </Routes>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;