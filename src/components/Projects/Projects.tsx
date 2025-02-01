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
    <div className="bg-black h-screen w-screen ">
      <FloatingNavbar/>
      <div className="max-w-5xl mx-auto p-6  ">
        <h2 className="text-4xl font-bold mb-4 mt-10 text-white">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  py-6">
          {projects.map((project) => (
            <Link to={`/projects/${project._id}`} key={project._id} className="text-white border-purple-800 border-l-4 border-b-2 rounded-lg p-4 shadow-lg bg-black transform transition-transform duration-300 hover:scale-105">
              <img src={project.coverImage} alt={project.title} className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="text-xl font-semibold mt-2">{project.title}</h3>
              <p className="text-gray-600">{project.description.substring(0, 100)}...</p>
              <span className="text-blue-500 mt-2 inline-block">View Details</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proj;
