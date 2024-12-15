import React from 'react';
import Sidebar from './SideBar/SideBar';
import { ProjectGrid } from './ProjectGrid/ProjectGrid';
import './Section2.css';
import '../../App.css';
import FloatingNavbar from '../Section1/Navbar/Navbar';

const Section2: React.FC = () => {
  return (
    <div className="root flex">
      <FloatingNavbar/>
      <Sidebar />

      <div className="w-4/5 p-4">
        <ProjectGrid />
      </div>
    </div>
  );
};

export default Section2;