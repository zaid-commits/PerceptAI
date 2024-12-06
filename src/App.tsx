import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import Main from './components/Section1/Hero/Main';
import AuthPage from './components/auth/AuthPage';
import AdminDashboard from './components/admin/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/*"
          element={
            <>
              <SignedIn>
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </SignedIn>
              <SignedOut>
                <Navigate to="/auth" replace />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;