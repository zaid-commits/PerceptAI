import React, { useState, useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';

const LoadingSpinner: React.FC = () => {
  const { loading } = useLoading();
  const [text, setText] = useState('Building...');
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prevText) => {
        switch (prevText) {
          case 'Building...':
            return 'Loading...';
          case 'Loading...':
            return 'Rendering...';
          case 'Rendering...':
            return 'Building...';
          default:
            return 'Building...';
        }
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!loading) {
      setAnimation(true);
      setTimeout(() => setAnimation(false), 1000);
    }
  }, [loading]);

  if (!loading) return null; 

  return (
    <div className={`flex flex-col justify-center items-center h-screen ${animation ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-black'} ${animation ? 'animate-pulse' : ''}`} style={{ backgroundImage: `url('https://i.pinimg.com/originals/ee/6e/d5/ee6ed5945d444fb5046149386acec4c8.gif')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className={`rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-600 ${animation ? 'animate-none' : 'animate-spin'}`}></div>
      <p className={`text-white mt-4 text-2xl font-bold ${animation ? 'animate-pulse' : ''}`}>{text}</p>
    </div>
  );
};

export default LoadingSpinner;