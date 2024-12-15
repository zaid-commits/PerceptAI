import React from 'react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import logo from '../../../assets/logos/corelogo.png';

const FloatingNavbar: React.FC = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray bg-opacity-70 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-10 p-4 navbar">
      <div className="flex items-center space-x-6">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="PerceptAI Logo" className="h-10" />
        </Link>

        {/* Navbar Items */}
        <Link to="/">
          <span className="text-gray-300 hover:text-white transition-colors duration-200">
            Home
          </span>
        </Link>
        <Link to="/projects">
          <span className="text-gray-300 hover:text-white transition-colors duration-200">
            Projects
          </span>
        </Link>
        <Link to="/blogs">
          <span className="text-gray-300 hover:text-white transition-colors duration-200">
            Articles
          </span>
        </Link>
        <Link to="/resources">
          <span className="text-gray-300 hover:text-white transition-colors duration-200">
            Resources
          </span>
        </Link>
        <Link to="/contact">
          <span className="text-gray-300 hover:text-white transition-colors duration-200">
            Contact
          </span>
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