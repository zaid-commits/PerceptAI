import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "@/api";
import { Button } from "../ui/button";
import FloatingNavbar from "../Navbar";
import ModernPurpleLoader from "../elements/Loader";

interface Project {
  title: string;
  description: string;
  elaboratedDescription: string;
  postedBy: string;
  codeLink: string;
  tags: string[];
  category: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) fetchProjectById(id).then(setProject);
  }, [id]);

  if (!project) return <ModernPurpleLoader />;

  return (
    <div className="bg-black min-h-screen">
      <FloatingNavbar />
      <div className="text-white py-14">
        <div className="max-w-3xl mx-auto py-6 mt-14  bg-gray-900 rounded-lg shadow-lg">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-gray-400 mb-4">{project.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <p>
              Posted by: <span className="font-semibold text-purple-500">{project.postedBy}</span>
            </p>
            <p>
              Category: <span className="font-semibold text-purple-500">{project.category}</span>
            </p>
          </div>
          <p className="text-gray-300 mb-4">{project.elaboratedDescription}</p>
          <div className="flex flex-wrap mb-4">
            <span className="text-sm font-semibold mr-2">Tags:</span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <p>
              Created at: <span className="font-semibold text-purple-500">{new Date(project.createdAt).toLocaleDateString()}</span>
            </p>
            <p>
              Updated at: <span className="font-semibold text-purple-500">{new Date(project.updatedAt).toLocaleDateString()}</span>
            </p>
          </div>
          <a href={project.codeLink} className="block text-center mt-4">
            <Button variant={"outline"}>View Code</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
