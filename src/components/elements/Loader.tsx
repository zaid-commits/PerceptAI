import React, { useState, useEffect } from 'react';

const ModernPurpleLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 2;
        } else {
          clearInterval(interval);
          return 100; 
        }
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#000] text-purple-800">
      <div className="text-4xl sm:text-8xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black">
        {progress}%
      </div>
    </div>
  );
};

export default ModernPurpleLoader;
