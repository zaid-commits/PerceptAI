// Section2.tsx
import React from 'react';
import Sidebar from './SideBar/SideBar';
import ProjectGrid from './ProjectGrid/ProjectGrid';
import './Section2.css';
import '../../App.css';

const Section2: React.FC = () => {
  return (
    <div className="root flex">
      <Sidebar />

      <div className="w-4/5 p-4">
        <ProjectGrid />
      </div>
    </div>
  );
};

export default Section2;
