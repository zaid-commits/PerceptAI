import React, { useState, useEffect } from 'react';
import FloatingNavbar from '../Navbar';
import { Link } from 'react-router-dom';
import ModernPurpleLoader from '../elements/Loader';
interface Resource {
  _id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  author: string;
  posterImage?: string;
  posterUsername?: string;
}

const AllResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('https://ts-backend-production-53c6.up.railway.app/api/resources');
        const data = await response.json();
        setResources(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource =>
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <ModernPurpleLoader />;
  }

  return (
    <div className="bg-[  #161818] py-20 min-h-fit">
      <FloatingNavbar />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mt-10 mb-3 py-8">
          <h2 className="text-4xl font-bold text-white text-center flex-grow ml-6 pl-10 uppercase">Resource Library</h2>
          <Link to="/resources/submit" className="bg-purple-900 text-white p-2 rounded hover:bg-purple-700 transition-colors">
            Submit Resource
          </Link>
        </div>
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full mb-2 p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
          {filteredResources.map(resource => (
            resource.title && resource.description && resource.link && resource.category && (
              <div
                key={resource._id}
                className="bg-[#ffffff17] border-b border-l border-[#492c976f] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                <span className="inline-block bg-purple-700 text-white text-xs px-2 py-1 rounded mb-4">
                  {resource.category}
                </span>
                <p className="text-gray-400 mb-1">{resource.description}</p>

                <a
                  href={resource.link}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View full resource
                </a>
                <div className="mt-4 flex items-center w-[100%] ">

                  <div className="flex items-center justify-between w-[100%]">
                    <span className="text-white ml-2">
                      posted by <a href="#" className="text-purple-800">{resource.posterUsername}</a>
                    </span>
                    {resource.posterImage && (
                      <img
                        className="rounded-lg w-10 h-10 ml-4"
                        src={resource.posterImage}
                        alt={resource.posterUsername}
                      />
                    )}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};


export default AllResources;
