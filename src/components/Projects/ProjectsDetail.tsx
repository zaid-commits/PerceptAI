import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProjectById, fetchAllProjects } from "@/api";
import FloatingNavbar from "../Navbar";
import ModernPurpleLoader from "../elements/Loader";
import Footer from "../Footer";
import Promo from "../promo";
import { Button } from "../ui/button";
import Proj from "./Projects";
import CollaborationButton from "./CollaborationButton";

interface Project {
  id: string;
  title: string;
  description: string;
  elaboratedDescription: string;
  postedBy: string;
  email: string; // Ensure the backend provides this field
  codeLink: string;
  tags: string[];
  category: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  useCases: string[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [, setOtherProjects] = useState<Project[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  // const { user } = useUser(); // Fetch current logged-in user

  useEffect(() => {
    if (id) {
      fetchProjectById(id).then(setProject);
      fetchAllProjects().then((projects) => {
        setOtherProjects(projects.filter((proj: Project) => proj.id !== id));
      });
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!project) return <ModernPurpleLoader />;

  const demoUseCases = ["Demo use case 1", "Demo use case 2", "Demo use case 3"];
  const useCases = project.useCases && project.useCases.length > 0 ? project.useCases : demoUseCases;

  // Get project owner's email from the backend (fallback if undefined)
  const ownerEmail = project?.email || "contact@perceptai.com";

  // Pre-filled email template for collaboration
  const mailToLink = `mailto:${ownerEmail}?subject=Collaboration Request for ${project.title}&body=Hi, I am interested in collaborating on your project '${project.title}'. Let's discuss further!`;

  return (
    <div className="bg-black min-h-screen flex flex-col pt-16">
      <FloatingNavbar />
      <div className="text-white py-14 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-black rounded-lg shadow-lg p-8">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
              <p>
                Posted by: <span className="font-semibold text-purple-500">{project.postedBy}</span>
              </p>
              <p>
                Category: <span className="font-semibold text-purple-500">{project.category}</span>
              </p>
            </div>
            <p className="text-gray-300 mb-6">{project.elaboratedDescription}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm font-semibold">Tags:</span>
              {project.tags.map((tag) => (
                <span key={tag} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 mb-6">
              <p>Created: <span className="font-semibold text-purple-500">{new Date(project.createdAt).toLocaleDateString()}</span></p>
              <p>Updated: <span className="font-semibold text-purple-500">{new Date(project.updatedAt).toLocaleDateString()}</span></p>
            </div>

            {/* View Code Button */}
            <a href={project.codeLink} className="block text-center">
              <Button variant="outline" className="text-black">View Code</Button>
            </a>

            {/* Collaborate Button */}
            {ownerEmail ? (
              <div className="mt-6 text-center">
                <CollaborationButton mailToLink={mailToLink} />
              </div>
            ) : (
              <div className="mt-6 text-center text-gray-400">
                Collaboration not available.
              </div>
            )}

            {/* Use Cases Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Promote Your Tool Section */}
            <div className="p-6 bg-black rounded-lg shadow-lg border border-purple-700 text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Promote Your Tool</h2>
              <p className="text-gray-300 mb-4">Want to showcase your own tool? Submit it here and get featured in our community.</p>
              <Link to="/projects/submit">
                <Button variant="outline" className="text-black hover:bg-gray-300 border-none">Submit Your Tool</Button>
              </Link>
            </div>

            {/* Rating Box */}
            <div className="p-6 bg-black rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Rate This Project</h2>
              <p className="mb-4 text-gray-400">Your rating helps the developer improve the project further.</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`text-3xl ${rating && rating >= star ? "text-purple-500" : "text-gray-500"}`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Other Projects Section */}
        <Proj />
      </div>
      <Promo />
      <Footer />
    </div>
  );
};

export default ProjectDetail;
