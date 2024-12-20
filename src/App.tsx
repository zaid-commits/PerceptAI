import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import ModernPurpleLoader from './components/elements/Loader';
import { useLoading } from './context/LoadingContext';
const Main = React.lazy(() => import('./components/Section1/Hero/Main'));
const Test = React.lazy(() => import('./components/routes/Test'));
const Projects = React.lazy(() => import('./components/routes/Projects'));
const Resources = React.lazy(() => import('./components/routes/Resources'));
const Contact = React.lazy(() => import('./components/routes/Contact'));
const AuthPage = React.lazy(() => import('./components/auth/AuthPage'));
const Blogs = React.lazy(() => import('./components/routes/Blogs'));
const UserManagement = React.lazy(() => import('./components/admin/UserManagement'));
const Analytics = React.lazy(() => import('./components/admin/Analytics'));
const AdminDashboard = React.lazy(() => import('./components/admin/adminDashboard'));
const Newsletter = React.lazy(() => import('./components/admin/NewsLetter'));
const AdminRoute = React.lazy(() => import('./components/auth/AdminRoute'));
const Community = React.lazy(() => import('./components/routes/Community'));

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
          <Suspense fallback={<ModernPurpleLoader />}>
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
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/admin/*" element={<AdminRoute element={<AdminDashboard />} />}>
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
          </Suspense>
        </Router>
      )}
    </>
  );
};

export default App;