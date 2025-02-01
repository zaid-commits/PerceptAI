import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "@/api";
import { Button } from "../ui/button";
import FloatingNavbar from "../Navbar";

interface Project {
  title: string;
  description: string;
  elaboratedDescription: string;
  postedBy: string;
  codeLink: string;
  tags: string[];
  category: string;
  coverImage: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) fetchProjectById(id).then(setProject);
  }, [id]);

  if (!project) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <FloatingNavbar />
    
    <div className="bg-black h-[100vh] w-screen text-white py-14">
      <div className="max-w-3xl mx-auto p-6 ">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-60 object-cover rounded-lg mb-4 "
        />
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-gray-700 my-2">{project.description}</p>
        <p className="text-sm text-gray-500">
          Posted by: <span className="font-semibold text-purple-800">{project.postedBy}</span>
        </p>
        <p className="text-sm text-gray-500">
          Category: <span className="font-semibold text-purple-800">{project.category}</span>
        </p>
        <p className="text-gray-600">{project.elaboratedDescription}</p>
        <div className="mt-3">
          <span className="text-sm font-semibold">Tags:</span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mx-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <a href={project.codeLink} className="block text-black mt-4">
          <Button variant={"outline"}>View Code</Button>
        </a>
      </div>
    </div>
    
    </div>
  );
};

export default ProjectDetail;
