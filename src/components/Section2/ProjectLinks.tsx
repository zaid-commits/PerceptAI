import { useEffect, useState } from 'react';
import RunProjectButton from './RunProjectButton';
const ProjectLinks = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://ts-backend-6swe.onrender.com/'); // Adjust as needed
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
