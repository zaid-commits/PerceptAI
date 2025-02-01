import { useState } from 'react';
import { motion } from 'framer-motion';
import {  Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Star, GitFork, ExternalLink, Code, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';

interface Project {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  category: string;
  stars: number;
  forks: number;
  demoUrl: string;
  codeUrl: string;
  tags: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card 
        className="relative h-full overflow-hidden border border-[#808080a9] bg-[#161818] hover:border-purple-600 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div className="absolute inset-0 " />
        </div>

        <CardHeader className="relative z-10 -mt-20 pb-0">
          <div className="space-y-1">
            <Badge 
              variant="outline" 
              className="bg-purple-800/20 text-purple-400 border-purple-800 mb-2"
            >
              {project.category}
            </Badge>
            <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
            <p className="text-sm text-gray-400">byy {project.author}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          <p className="text-gray-300 line-clamp-3">{project.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <Badge 
                key={index}
                variant="outline" 
                className="bg-purple-900/20 text-purple-300 border-purple-800"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center space-x-4 text-gray-400">
            <span className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </span>
            <span className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </span>
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className="bg-purple-800/20 border-purple-800 hover:bg-purple-800/40 text-white"
            asChild
          >
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Eye className="w-4 h-4 mr-2" />
              Demo
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="bg-purple-800/20 border-purple-800 hover:bg-purple-800/40 text-white"
            asChild
          >
            <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
              <Code className="w-4 h-4 mr-2" />
              Code
            </a>
          </Button>
          <Button 
            variant="outline" 
            className="bg-purple-800/20 border-purple-800 hover:bg-purple-800/40 text-white"
            asChild
          >
            <a href={`/projects/${project.id}`}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Details
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard ;