import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "@/api";
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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="border rounded-lg p-4 shadow-lg bg-white">
            <img src={project.coverImage} alt={project.title} className="w-full h-40 object-cover rounded" />
            <h3 className="text-xl font-semibold mt-2">{project.title}</h3>
            <p className="text-gray-600">{project.description.substring(0, 100)}...</p>
           
            <Link to={`/projects/${project._id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proj;
