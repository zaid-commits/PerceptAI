import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaSearch, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './HeroSection.css';
import FloatingNavbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [stars, setStars] = useState<number>(612);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGitHubStars = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/zaid-commits/perceptai');
        const data = await response.json();
        setStars(data.stargazers_count);
      } catch (error) {
        console.error('Error fetching GitHub stars:', error);
      }
    };

    fetchGitHubStars();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    navigate('/projects');
  };

  return (
    <div className="hero-section">
        <FloatingNavbar/>
      <div className="hero-content py-10 mt-10">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AI Infused Vision <span className="highlight">Directory</span>
        </motion.h1>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore the world of AI and Machine Learning with next level Computer Vision projects. 
          Dive into our <span className="highlight">open-source</span> project directory now!
        </motion.p>
        <motion.form 
          onSubmit={handleSearchSubmit} 
          className="search-form"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search for AI projects, models, or tutorials..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </motion.form>
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://github.com/zaid-commits/perceptai"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
          >
            <FaGithub className="button-icon" />
            Star on GitHub
            <FaStar className="star-icon" />
            <span className="star-count">{stars}</span>
          </a>
          <button className="start-button">
            <Link to="/projects">Lets Get Started</Link>
            <FaArrowRight className="mx-2 arrow-icon" />
          </button>
        </motion.div>
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
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default HeroSection;
