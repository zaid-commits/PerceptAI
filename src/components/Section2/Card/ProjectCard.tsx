import React from 'react';
import { Star, GitBranch, ExternalLink, Github } from 'lucide-react';

// Define the type for the project prop
interface Project {
  imageUrl: string;
  title: string;
  category: string;
  author: string;
  description: string;
  stars: number;
  forks: number;
}

// Define the props for the ProjectCard component
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-slate-930 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-900">
      <div className="relative h-48">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-white mb-2 truncate">{project.title}</h2>
        <a href={`https://github.com/${project.author}`}>
          <p className="text-purple-400 text-sm mb-3 font-medium">{project.author}</p>
        </a>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-yellow-400">
              <Star size={16} className="mr-1" />
              <span className="font-semibold text-sm">{project.stars}</span>
            </div>
            <div className="flex items-center text-green-400">
              <GitBranch size={16} className="mr-1" />
              <span className="font-semibold text-sm">{project.forks}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center group hover:ring-2 hover:ring-gray-500 hover:ring-offset-1 hover:ring-offset-gray-900">
            <Github size={16} className="mr-2 group-hover:animate-pulse" />
            <span className="text-sm font-semibold">View Code</span>
          </button>
          <button className="flex-1 bg-purple-800 hover:bg-purple-700 text-white py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center group hover:ring-2 hover:ring-purple-600 hover:ring-offset-1 hover:ring-offset-gray-900">
            <ExternalLink size={16} className="mr-2 group-hover:animate-pulse" />
            <span className="text-sm font-semibold">Try Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProjectCard };