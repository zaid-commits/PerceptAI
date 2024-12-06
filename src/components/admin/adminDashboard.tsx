import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Newsletter from './Newsletter';
import UserManagement from './UserManagement';
import Analytics from './Analytics';
import Sidebar from './Sidebar';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <Routes>
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="/" element={<h2>Welcome to the Admin Dashboard</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;