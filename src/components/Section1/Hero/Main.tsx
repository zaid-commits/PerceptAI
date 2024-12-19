import React from 'react';
import Footer from "@/components/Footer";
// import Section3 from "@/components/Section3/Section3";
import Section4 from "@/components/Section4/Section4";
import Section5 from "@/components/Section5/Section5";
import HeroSection from '../HeroSection/HeroSection';

const Main: React.FC = () => {
  return (
    <div>
      <HeroSection/>
      <Section4 />
      {/* <Section3 /> */}
      <Section5 />
      <Footer />
    </div>
  );
};

export default Main;