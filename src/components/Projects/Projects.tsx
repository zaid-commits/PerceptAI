import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "@/api";
import FloatingNavbar from "../Navbar";

interface Project {
  _id: string;
  title: string;
  description: string;
  coverImage: string;
  elaboratedDescription: string;
}

const Proj = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <div className="bg-black min-h-screen w-full">
      <FloatingNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-4xl font-bold mb-8 mt-10 text-white text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
          {projects.map((project) => (
            <Link
              to={`/projects/${project._id}`}
              key={project._id}
              className="text-white border border-gray-700 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description.substring(0, 100)}...</p>
                <span className="text-blue-500 font-medium">View Details</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proj;
