import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FloatingNavbar from "../Navbar";
import Footer from "../Footer";
import Promo from "../promo";
import ModernPurpleLoader from "../elements/Loader";

interface Resource {
  _id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  author: string;
  posterImage?: string;
  posterUsername?: string;
  detailedDescription: string;
  tags: string[];
}

const ResourceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/resources/${id}`);
        const data = await response.json();
        setResource(data);
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResource();
  }, [id]);

  if (isLoading) {
    return <ModernPurpleLoader />;
  }

  if (!resource) {
    return <div className="text-center text-red-500">Resource not found</div>;
  }

  return (
    <div className="bg-[#000] text-white min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">{resource.title}</h1>
        <div className="mb-4">
          <span className="inline-block bg-purple-700 text-white text-xs px-2 py-1 rounded">
            {resource.category}
          </span>
        </div>
        <p className="text-gray-400 mb-4">{resource.description}</p>
        <p className="text-gray-400 mb-4">{resource.detailedDescription}</p>
        <a
          href={resource.link}
          className="text-purple-400 hover:text-purple-300 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          View full resource
        </a>
        <div className="mt-4">
          <span className="text-white">
            posted by{" "}
            <a href="#" className="text-purple-800">
              {resource.posterUsername ?? "Unknown"}
            </a>
          </span>
          {resource.posterImage && (
            <img
              className="rounded-lg w-10 h-10 ml-4"
              src={resource.posterImage}
              alt={resource.posterUsername ?? "Poster"}
            />
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-2xl font-bold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {resource.tags.map((tag, index) => (
              <span key={index} className="bg-purple-700 text-white text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Promo />
      <Footer />
    </div>
  );
};

export default ResourceDetail;