import React from 'react';
import FloatingNavbar from "../Section1/Navbar/Navbar"

const UserManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-purple-500 mb-8">User Management</h1>
        <p className="text-center text-gray-300">View and manage your users here...</p>
      </div>
    </div>
  );
};

export default UserManagement;

