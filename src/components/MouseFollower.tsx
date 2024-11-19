import React, { useEffect, useState } from 'react';

const MouseFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setTimeout(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      }, 100); 
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'rgba(128, 0, 128, 0.7)', // Changed color to purple
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'background-color 0.3s',
        zIndex: 9999, // Added z-index for layering
        boxShadow: '0 0 8px rgba(128, 0, 128, 0.5)', // Changed shadow color to purple
      }}
    />
  );
};

export default MouseFollower;