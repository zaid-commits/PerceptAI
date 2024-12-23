import React, { useState, useEffect } from 'react';
import FloatingNavbar from '../Section1/Navbar/Navbar';

interface Resource {
  _id: string; // MongoDB ID
  title: string;
  description: string;
  link: string;
  category: string;
}

const ResourceLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    link: '',
    category: ''
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/resources');
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
    setNewResource(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newResource)
      });
      const data = await response.json();
      setResources(prev => [...prev, data]);
      setNewResource({ title: '', description: '', link: '', category: '' });
    } catch (error) {
      console.error('Error adding resource:', error);
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center text-white">Loading resources...</div>;
  }

  return (
    <div className="bg-black py-20">
      <FloatingNavbar />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Resource Library</h2>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            name="title"
            value={newResource.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="block w-full mb-2 p-2"
            required
          />
          <input
            type="text"
            name="description"
            value={newResource.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="block w-full mb-2 p-2"
            required
          />
          <input
            type="text"
            name="link"
            value={newResource.link}
            onChange={handleInputChange}
            placeholder="Link"
            className="block w-full mb-2 p-2"
            required
          />
          <input
            type="text"
            name="category"
            value={newResource.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="block w-full mb-2 p-2"
            required
          />
          <button type="submit" className="bg-purple-800 text-white p-2 rounded">Add Resource</button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map(resource => (
            resource.title && resource.description && resource.link && resource.category && (
              <div key={resource._id} className="bg-gray-800 p-4 rounded">
                <h3 className="text-xl font-bold text-white">{resource.title}</h3>
                <p className="text-gray-400">{resource.description}</p>
                <a href={resource.link} className="text-purple-400" target="_blank" rel="noopener noreferrer">Learn more</a>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;