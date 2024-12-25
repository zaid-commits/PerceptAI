import React, { useState, useEffect } from 'react';
import FloatingNavbar from '../Section1/Navbar/Navbar';
import { useUser } from '@clerk/clerk-react';

interface Resource {
  _id: string; // MongoDB ID
  title: string;
  description: string;
  link: string;
  category: string;
  author: string;
  posterImage?: string; // Optional poster image URL
}

const ResourceLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const { user } = useUser();
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    link: '',
    category: '',
    posterImage: '',
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePosterImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewResource((prev) => ({ ...prev, posterImage: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resourceToSubmit = { ...newResource, posterImage: user?.imageUrl || '' };
      const response = await fetch('https://ts-backend-production-53c6.up.railway.app/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resourceToSubmit),
      });
      const data = await response.json();
      setResources((prev) => [...prev, data]);
      setNewResource({ title: '', description: '', link: '', category: '', posterImage: user?.imageUrl || '' });
      setIsAddingResource(false);
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const filteredResources = resources.filter((resource) =>
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center text-white">Loading resources...</div>;
  }

  return (
    <div className="bg-black py-20 min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-4 flex">
        <span className='text-white'> hello </span>
        <h2 className="text-4xl font-bold text-center text-white mb-8">Resource Library</h2>
        {isAddingResource ? (
          <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                value={newResource.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="text"
                name="description"
                value={newResource.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="text"
                name="link"
                value={newResource.link}
                onChange={handleInputChange}
                placeholder="Link"
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="text"
                name="category"
                value={newResource.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="text"
                name="posterImage"
                value={newResource.posterImage}
                onChange={handlePosterImageChange}
                placeholder="Poster Image URL"
                className="block w-full mb-2 p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <button type="submit" className="bg-purple-800 text-white p-2 rounded mt-4 hover:bg-purple-700 transition-colors">
              Add Resource
            </button>
            <button
              type="button"
              onClick={() => setIsAddingResource(false)}
              className="bg-gray-600 text-white p-2 rounded mt-4 ml-4 hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full mb-2 p-2 rounded bg-black text-white border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button onClick={() => setIsAddingResource(true)} className="bg-purple-800 text-white p-2 rounded ml-4 hover:bg-purple-700 transition-colors">
                Add Resource
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                resource.title &&
                resource.description &&
                resource.link &&
                resource.category && (
                  <div
                    key={resource._id}
                    className="bg-black border-b border-l border-purple-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    {resource.posterImage && (
                      <img
                        src={resource.posterImage}
                        alt={resource.title}
                        className="w-full h-40 object-cover rounded-t-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-400 mb-4">{resource.description}</p>
                    <a
                      href={resource.link}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View full resource
                    </a>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-block bg-purple-700 text-white text-xs px-2 py-1 rounded">
                        {resource.category}
                      </span>
                      <span className="text-white">{user?.fullName}</span>
                    </div>
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceLibrary;
