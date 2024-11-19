'use client'
import { Route, BrowserRouter as Router, Routes, useLocation, Navigate } from 'react-router-dom';
import { Main } from './components/Section1/Hero/Main';
import Test from './components/routes/Test';
import { Analytics } from "@vercel/analytics/react";
import Projects from './components/routes/Projects';
import Community from './components/routes/Community';
import Resources from './components/routes/Resources';
import Contact from './components/routes/Contact';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import UserProfile from './components/Auth/Profile';
import LoadingSpinner from './components/LoadingSpinner';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { useEffect, useState } from 'react';

const AppRoutes: React.FC = () => {
  const { setLoading } = useLoading();
  const location = useLocation();
  const [isLoggedIn] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, [location, setLoading]);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/Resources" element={<Resources />} />
      <Route path="/Community" element={<Community />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Test" element={<Test />} />
      <Route path="/Register" element={isLoggedIn ? <Navigate to="/UserProfile" /> : <Register />} />
      <Route path="/Login" element={isLoggedIn ? <Navigate to="/UserProfile" /> : <Login />} />
      <Route path="/UserProfile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/Login" />} />
    </Routes>
  );
};

function App() {
  return (
    <LoadingProvider>
        <Router>
          <LoadingSpinner /> 
          <AppRoutes />
        </Router>
      <Analytics />
    </LoadingProvider>
  );
}

export default App;