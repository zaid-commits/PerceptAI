import React from 'react';
import { useLoading } from '../context/LoadingContext';

const LoadingSpinner: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null; 

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-600"></div>
    </div>
  );
};

export default LoadingSpinner;