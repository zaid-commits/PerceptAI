import React, { useEffect, useState } from "react";
import ProjectCard from "../Card/ProjectCard";

// Define the type for a project object
interface Project {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  stars: number;
  forks: number;
  imageUrl: string;
  demoUrl: string;
  codeUrl: string;
  tags: string[];
}

const ProjectGrid: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log(import.meta.env.REACT_APP_API_URL); // Add this line to check the value
        const response = await fetch(
          `https://ts-backend-6swe.onrender.com/api/projects`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-300">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="heading text-4xl mt-14 py-6 font-bold mb-4 text-center">
        Featured <span className="text-purple-700">Projects</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
