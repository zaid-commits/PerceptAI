import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/Images/corelogo.png'; // Corrected import


const FloatingNavbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray bg-opacity-70 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-10 p-4 navbar">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link to="/">
          <a href="#">
            <img src={logo} alt="PerceptAI Logo" className="h-10" />
          </a>
        </Link>
        
        {/* Navbar Items */}
        <Link to={"/"}>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </a>
        </Link>
        <Link to={"/Test"}>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Projects
          </a>
        </Link>
        <Link to={"/Test"}>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Resources
          </a>
        </Link>
        <Link to={"/Test"}>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Contact
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
