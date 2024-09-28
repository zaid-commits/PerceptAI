import React, { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Sidebar: React.FC = () => {
  useEffect(() => {
    const ts1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".root",
        start: "top 0",
        end: "bottom 100%",
        scrub: 2,
        markers: true,
      }
    });

    // Animation from 0 to 600 on the y-axis
    ts1.fromTo(".tt", {
      y: 0,
    }, {
      y: 600,
      duration: 1,
    });

    // Cleanup function to kill the ScrollTrigger
    // return () => {
    //   ts1.kill();
    //   ScrollTrigger.kill();
    // };
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="w-1/5 bg-black p-4 rounded-md shadow-md h-full side tt">
      <h2 className="text-xl font-bold mb-4">Most Popular Machine Learning Tools</h2>
      <strong>
        <p>Trending Topics</p>
      </strong>
      {/* Example navigation */}
      <nav className="mt-4">
        <ul className="space-y-2">
          <li><a href="#projects" className="text-sm hover:bg-gray-200 p-2 block rounded">OpenCV</a></li>
          <li><a href="#about" className="text-sm hover:bg-gray-200 p-2 block rounded">Mediapipe</a></li>
          <li><a href="#contact" className="text-sm hover:bg-gray-200 p-2 block rounded">TensorFlow</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
