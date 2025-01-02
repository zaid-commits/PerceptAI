// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const ModernPurpleLoader: React.FC = () => {
//   const [textIndex, setTextIndex] = useState(0);
//   const texts = ["GENERATING", "COOKING", "LOADING", "DISPLAYING"];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
//     }, 800);

//     return () => clearInterval(interval);
//   }, []);

//   const circleVariants = {
//     start: {
//       y: "0%",
//     },
//     end: {
//       y: "100%",
//     },
//   };

//   const transition = {
//     duration: 0.5,
//     yoyo: Infinity,
//     ease: "easeInOut",
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black" role="alert" aria-live="assertive">
//       <div className="relative w-64 h-64">
//         <svg
//           viewBox="0 0 100 100"
//           className="w-full h-full"
//           aria-hidden="true"
//         >
//           <defs>
//             <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#6B46C1" />
//               <stop offset="100%" stopColor="#9F7AEA" />
//             </linearGradient>
//           </defs>
//           <motion.circle
//             cx="50"
//             cy="50"
//             r="30"
//             stroke="url(#gradient)"
//             strokeWidth="4"
//             fill="none"
//             initial={{ pathLength: 0 }}
//             animate={{ pathLength: 1 }}
//             transition={{
//               duration: 2,
//               ease: "easeIn",
//               repeat: Infinity,
//               repeatType: "mirror",
//             }}
//           />
//           <g transform="translate(50 50)">
//             {[0, 1, 2].map((index) => (
//               <motion.circle
//                 key={index}
//                 cx="0"
//                 cy="0"
//                 r="5"
//                 fill="#9F7AEA"
//                 variants={circleVariants}
//                 initial="start"
//                 animate="end"
//                 transition={{
//                   ...transition,
//                   delay: index * 0.15,
//                 }}
//               />
//             ))}
//           </g>
//         </svg>
//       </div>
//       <motion.div
//         className="mt-8 text-purple-300 text-xl font-light tracking-wide"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.5 }}
//       >
//         <span className="font-semibold">{texts[textIndex]}</span>
//         <motion.span
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{
//             duration: 0.5,
//             repeat: Infinity,
//             repeatType: "mirror",
//           }}
//         >
//           ...
//         </motion.span>
//       </motion.div>
//     </div>
//   );
// };

// export default ModernPurpleLoader;

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#161818] text-purple-800">
      <div className="text-[10rem] font-black ">
        {progress}%
      </div>
    </div>
  );
};

export default ModernPurpleLoader;
