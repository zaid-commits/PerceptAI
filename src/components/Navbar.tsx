import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logos/corelogo.png'
const FloatingNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/opencv', label: 'OpenCV' },
    { to: '/resources', label: 'Resources' },
    { to: '/blogs', label: 'Articles' },
    { to: '/community', label: 'Community' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray bg-opacity-70 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-10 p-4 navbar w-[95%] md:w-auto navShadow">
      <div className="flex items-center justify-between md:justify-start md:space-x-6">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="PerceptAI Logo" className="h-10 w-10" />
        </Link>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors duration-200"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 flex-grow">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-2">
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-gray bg-opacity-90 backdrop-blur-md mt-4 rounded-2xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-2 space-y-2 bg-gray bg-opacity-30 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block text-gray-300 hover:text-white transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 pb-4">
            <SignedOut>
              <SignInButton>
                <Button variant="default" className="w-full">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;
