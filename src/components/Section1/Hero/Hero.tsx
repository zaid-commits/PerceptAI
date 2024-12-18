import React, { useState, useEffect } from 'react';
import FloatingNavbar from '../../Section1/Navbar/Navbar';
import HeroContent from './HeroContent';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommandMenu } from '../Navbar/CommandMenu';

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.from(".navbar", {
      y: -100,
      opacity: 0,
      duration: 1,
    });

    gsap.from(".wrap .box", {
      x: 100,
      opacity: 0,
      stagger: 0.7,
      rotate: 80,
      scrub: 1.5,
    });

    gsap.from(".text-container h1 , .text-container p ", {
      y: 40,
      opacity: 0,
      stagger: 1,
    });

    gsap.from(".ani", {
      x: 100,
      height: 700,
      width: 700,
    });
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setIsCommandMenuOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        <FloatingNavbar />

        <div className="absolute inset-0 z-0">
          <div className="relative h-full w-full bg-black">
            <div className="wrap">
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
              <div className="box"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
            </div>
            <div className="ani absolute left-[12%] right-50 top-[10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_400px_at_10%_300px,#fbfbfb16,#000)]">
            </div>
          </div>
        </div>

        {/* Content */}
        <HeroContent />
        <nav className="fixed text-white top-6 right-4 bg-gray bg-opacity-70 backdrop-blur-md rounded-full shadow-lg border border-gray-700 z-10 p-4 navbar">
            <button className="hidden sm:block" onClick={() => setIsCommandMenuOpen(prev => !prev)}>
            ⌘+K to toggle
            </button>
        </nav>
        <div className="fixed top-4 right-4 z-20">
          <CommandMenu isOpen={isCommandMenuOpen} setIsOpen={setIsCommandMenuOpen} notes={[]} tags={[]} />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;