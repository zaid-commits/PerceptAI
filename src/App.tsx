import { Route, BrowserRouter as Router, Routes, useLocation, Navigate } from 'react-router-dom';
import { Main } from './components/Section1/Hero/Main';
import Test from './components/routes/Test';
// import { Analytics } from "@vercel/analytics/react";
import Projects from './components/routes/Projects';
import Community from './components/routes/Community';
import Resources from './components/routes/Resources';
import Contact from './components/routes/Contact';
// import LoadingSpinner from './components/LoadingSpinner';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { useEffect } from 'react';
import { SignedOut, SignedIn } from '@clerk/clerk-react';
import Header from './components/auth/Header';
import AuthPage from './components/auth/AuthPage';

const AppRoutes: React.FC = () => {
  const { setLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return (
    <div>
      <Header /> {/* Include the Header component */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/test" element={<Test />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<AuthPage />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <>
      <SignedOut>
        <AuthPage />
      </SignedOut>
      <SignedIn>
        <LoadingProvider>
          <Router>
            <AppRoutes />
          </Router>
        </LoadingProvider>
      </SignedIn>
    </>
  );
};

export default App;