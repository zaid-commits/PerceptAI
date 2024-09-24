import React, { useEffect, useState } from 'react';
import RunProjectButton from './RunProjectButton';

const ProjectLinks = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/'); // Adjust as needed
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {projects.map((project, index) => (
        <div key={index} className="mb-4">
          <span className="text-white">{project}</span>
          <RunProjectButton projectName={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectLinks;
