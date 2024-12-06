import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/4 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">Home</Link>
        <Link to="/admin/newsletter" className="hover:bg-gray-700 p-2 rounded">Send Newsletter</Link>
        <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">User Management</Link>
        <Link to="/admin/analytics" className="hover:bg-gray-700 p-2 rounded">Analytics</Link>
      </nav>
    </div>
  );
};

export default Sidebar;