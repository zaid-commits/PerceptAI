import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logos/corelogo.png'; // Corrected import

const FloatingNavbar: React.FC = () => {
  return (
    <nav className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray bg-opacity-70 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-10 p-4 navbar">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="PerceptAI Logo" className="h-10" />
        </Link>
        
        {/* Navbar Items */}
        <Link to={"/"} className="text-gray-300 hover:text-white transition-colors duration-200">
          Home
        </Link>
        <Link to={"/Test"} className="text-gray-300 hover:text-white transition-colors duration-200">
          Projects
        </Link>
        <Link to={"/Test"} className="text-gray-300 hover:text-white transition-colors duration-200">
          Resources
        </Link>
        <Link to={"/Test"} className="text-gray-300 hover:text-white transition-colors duration-200">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
