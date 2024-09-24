import React from 'react';
import ProjectCard from '../Card/ProjectCard';

// Define the type for a project object
interface Project {
  title: string;
  author: string;
  description: string;
  category: string;
  stars: number;
  forks: number;
  imageUrl: string;
}

// Define the projects array with the Project type
const projects: Project[] = [
  {
    title: "Object Detection AI",
    author: "Zaid Rakhange",
    description: "Advanced computer vision for real-time object detection.",
    category: "OpenCV",
    stars: 154,
    forks: 23,
    imageUrl: "https://socialify.git.ci/zaid-commits/tools/image?description=1&descriptionEditable=lorem%20ipsum%20dolor%20set%20amet!&font=KoHo&forks=1&issues=1&language=1&name=1&owner=1&pattern=Charlie%20Brown&pulls=1&stargazers=1&theme=Dark"
  },
];

const ProjectGrid: React.FC = () => {
  return (
    <div id='featuredProjects' className="min-h-screen bg-black text-white p-6">
      <h1 className="heading text-4xl font-bold mb-8 text-center">Featured Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
