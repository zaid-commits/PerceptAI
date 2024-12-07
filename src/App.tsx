import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Main from './components/Section1/Hero/Main';
import Test from './components/routes/Test';
import Projects from './components/routes/Projects';
import Community from './components/routes/Community';
import Resources from './components/routes/Resources';
import Contact from './components/routes/Contact';
import AuthPage from './components/auth/AuthPage';
import Dashboard from './components/auth/Dashboard';
import Blogs from './components/routes/Blogs';
import UserManagement from './components/admin/UserManagement';
import Analytics from './components/admin/Analytics';
import ModernPurpleLoader from './components/elements/Loader';
import { useLoading } from './context/LoadingContext';
import AdminDashboard from './components/admin/adminDashboard';
import Newsletter from './components/admin/NewsLetter';
const App: React.FC = () => {
  const { loading, setLoading } = useLoading();

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      {loading && <ModernPurpleLoader />}
      {!loading && (
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
                      <Route path="/test" element={<Test />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/admin/*" element={<AdminDashboard />}>
                        <Route path="newsletter" element={<Newsletter />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="analytics" element={<Analytics />} />
                        <Route path="" element={<h2>Welcome to the Admin Dashboard</h2>} />
                      </Route>
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
      )}
    </>
  );
};

export default App;