// // FILE: components/Header.tsx
// import React from 'react';
// import { SignedOut, SignedIn, SignInButton, UserButton } from '@clerk/clerk-react';

// const Header: React.FC = () => {
//   return (
//     <header style={{ display: 'flex', justifyContent: 'center', padding: '10px', background: '#f8f9fa', alignItems: 'center' }}>
//       <SignedOut>
//         <SignInButton />
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   );
// };

// export default Header;

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

const FullPage: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <main style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Welcome to PerceptAI</h1>
            </main>
        </div>
    );
};

export default FullPage;