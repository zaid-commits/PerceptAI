import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FloatingNavbar from "../Navbar";
import Footer from "../Footer";
import Promo from "../promo";
import ModernPurpleLoader from "../elements/Loader";
import { Link } from "react-router-dom";

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
        const response = await fetch(`https://ztbm3dqt-5000.inc1.devtunnels.ms/api/resources/${id}`);
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
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="bg-[#0c0c0c] rounded-lg p-8 max-w-md w-full border border-gray-800">
          <div className="text-center">
            <span className="text-4xl mb-4">😕</span>
            <h2 className="text-2xl font-bold text-white mb-2">Resource Not Found</h2>
            <p className="text-gray-400 mb-4">
              We couldn't find the resource you're looking for. It may have been moved or deleted.
            </p>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Static data for demonstration
  const relatedResources = [
    {
      _id: "1",
      title: "Advanced Machine Learning Techniques",
      description: "Learn advanced techniques in machine learning.",
      category: "AI/ML",
    },
    {
      _id: "2",
      title: "Blockchain for Beginners",
      description: "A beginner's guide to understanding blockchain technology.",
      category: "Blockchain",
    },
    {
      _id: "3",
      title: "Web Development Best Practices",
      description: "Best practices for modern web development.",
      category: "Web Development",
    },
  ];

  const comments = [
    {
      id: "1",
      user: "John Doe",
      comment: "This resource is fantastic! It helped me a lot.",
      date: "2023-10-01",
    },
    {
      id: "2",
      user: "Jane Smith",
      comment: "Great explanation and very detailed. Thank you!",
      date: "2023-10-02",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen py-10">
      <FloatingNavbar />
      {/* Hero Section */}
      
      <div className="relative bg-[#0c0c0c] py-20 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">{resource.title}</h1>
          <p className="text-lg text-gray-300 mb-8">{resource.description}</p>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View Resource
          </a>
        </div>
      </div>

      {/* Resource Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-500">Detailed Description</h2>
              <p className="text-gray-400">{resource.detailedDescription}</p>
            </div>

            {/* Tags */}
            <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4  text-purple-500">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 text-white text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4  text-purple-500">Comments</h2>
              {comments.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-white">{comment.user[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold">{comment.user}</p>
                      <p className="text-sm text-gray-400">{comment.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mt-2">{comment.comment}</p>
                </div>
              ))}
              <textarea
                placeholder="Add a comment..."
                className="w-full bg-[#0c0c0c] border border-gray-800 rounded-lg p-3 mt-4 text-white"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg mt-2 hover:bg-gray-700 transition-colors">
                Submit Comment
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Section */}
            <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4  text-purple-500">Author</h2>
              <div className="flex items-center space-x-4">
                {resource.posterImage && (
                  <img
                    src={resource.posterImage || "/placeholder.svg"}
                    alt={resource.posterUsername ?? "Poster"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold">{resource.posterUsername ?? "Unknown"}</p>
                  <p className="text-sm text-gray-400">Resource Contributor</p>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-[#0c0c0c] border border-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4  text-purple-500">Related Resources</h2>
              {relatedResources.map((related) => (
                <div key={related._id} className="mb-4">
                  <h3 className="font-semibold">{related.title}</h3>
                  <p className="text-sm text-gray-400">{related.description}</p>
                  <span className="inline-block bg-gray-800 text-white text-xs px-2 py-1 rounded mt-2">
                    {related.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-[#0c0c0c] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Resource to Share?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Contribute to the community by submitting your own resources.
          </p>
          <Link
            to="/resources/submit"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Submit Resource
          </Link>
        </div>
      </div>

      <Promo />
      <Footer />
    </div>
  );
};

export default ResourceDetail;