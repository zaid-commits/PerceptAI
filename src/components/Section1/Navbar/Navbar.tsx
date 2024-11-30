import React from 'react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import logo from '../../../assets/logos/corelogo.png'; // Ensure the path is correct

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
        <Link to="/">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </a>
        </Link>
        <Link to="/projects">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Projects
          </a>
        </Link>
        <Link to="/community">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Community
          </a>
        </Link>
        <Link to="/resources">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Resources
          </a>
        </Link>
        <Link to="/contact">
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
            Contact
          </a>
        </Link>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-2">
          <SignedOut>
            <SignInButton>
              <Button variant="default">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;