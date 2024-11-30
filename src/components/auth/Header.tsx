// FILE: components/Header.tsx
import React from 'react';
import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/clerk-react';

const Header: React.FC = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#f8f9fa', alignItems: 'center' }}>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Header;