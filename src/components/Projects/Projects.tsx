import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects } from "@/api";
import FloatingNavbar from "../Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "../ui/button";

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
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-bold mb-8 mt-16 text-white text-center">PerceptAI Projects Directory</h2>
        <div className="flex justify-end space-x-4">
          <Link to="/projects/submit">
            <Button className="">
              Submit a Project
            </Button>
          </Link>
          <Link to="/projects/collaborator">
            <Button variant={"secondary"} className="bg-white">
              Just an Idea? Submit it here!
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
          {projects.map((project) => (
            <Link
              to={`/projects/${project._id}`}
              key={project._id}
              className="transform transition-transform duration-300 hover:scale-105"
            >
              <Card className="bg-black text-white border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
                <div className="relative">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-2xl font-semibold mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-gray-400 mb-4">
                    {project.description.substring(0, 100)}...
                  </CardDescription>
                  <span className="text-blue-500 font-medium">View Details</span>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proj;