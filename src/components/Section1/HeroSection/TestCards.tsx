import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
import { LuBrain } from "react-icons/lu";
import { FaEarthAmericas } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { ImSearch } from "react-icons/im";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Accepts any valid React element
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div
      className="feature-card group w-[100%] bg-[#ffffff20] hover:bg-[#ffffff0f] transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="feature-icon text-white group-hover:text-purple-800 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  );
};

const FeatureCards: React.FC = () => {
  return (
    <motion.div
      className="feature-grid mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <FeatureCard
        title="Advanced AI Models"
        description="Access state-of-the-art machine learning models for computer vision tasks."
        icon={<LuBrain />}
      />
      <FeatureCard
        title="Open Source Projects"
        description="Explore and contribute to a wide range of open source AI projects."
        icon={<FaEarthAmericas />}
      />
      <FeatureCard
        title="Community Driven"
        description="Join a thriving community of AI enthusiasts and professionals."
        icon={<FaUsers />}
      />
      <FeatureCard
        title="Cutting-edge Research"
        description="Stay updated with the latest advancements in AI and computer vision."
        icon={<ImSearch />}
      />
    </motion.div>
  );
};

export default FeatureCards;
