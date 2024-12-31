import React from 'react';
import { motion } from 'framer-motion';
import './components/Section1/HeroSection/HeroSection.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="feature-card bg-black">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

const FeatureCards: React.FC = () => {
  return (
      
    <motion.div
      className="feature-grid"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      >
      <FeatureCard
        title="Advanced AI Models"
        description="Access state-of-the-art machine learning models for computer vision tasks."
        icon="🧠"
        />
      <FeatureCard
        title="Open Source Projects"
        description="Explore and contribute to a wide range of open source AI projects."
        icon="🌐"
      />
      <FeatureCard
        title="Community Driven"
        description="Join a thriving community of AI enthusiasts and professionals."
        icon="👥"
      />
      <FeatureCard
        title="Cutting-edge Research"
        description="Stay updated with the latest advancements in AI and computer vision."
        icon="🔬"
        />
    </motion.div>
  );
};

export default FeatureCards;
