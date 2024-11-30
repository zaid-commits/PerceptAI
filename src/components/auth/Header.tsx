import React from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">PerceptAI</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-4">
            <Link to="/projects" className="text-sm font-medium">
              Projects
            </Link>
            <Link to="/community" className="text-sm font-medium">
              Community
            </Link>
            <Link to="/resources" className="text-sm font-medium">
              Resources
            </Link>
            <Link to="/contact" className="text-sm font-medium">
              Contact
            </Link>
          </div>
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
        </nav>
      </div>
    </header>
  );
};
