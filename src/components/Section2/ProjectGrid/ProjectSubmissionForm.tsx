import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const ProjectSubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    stars: 0,
    forks: 0,
    imageUrl: '',
    demoUrl: '',
    codeUrl: '',
    tags: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://ts-backend-6swe.onrender.com/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, tags: formData.tags.split(',').map(tag => tag.trim()) })
      });
      if (response.ok) {
        toast.success('Project added successfully!');
        setFormData({
          title: '',
          author: '',
          description: '',
          category: '',
          stars: 0,
          forks: 0,
          imageUrl: '',
          demoUrl: '',
          codeUrl: '',
          tags: ''
        });
      } else {
        toast.error('Failed to add project');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Project Description"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <input
        type="text"
        name="demoUrl"
        value={formData.demoUrl}
        onChange={handleChange}
        placeholder="Demo URL"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <input
        type="text"
        name="codeUrl"
        value={formData.codeUrl}
        onChange={handleChange}
        placeholder="Code URL"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="Tags (comma separated)"
        className="w-full p-2 rounded bg-gray-800 text-white border border-purple-500"
        required
      />
      <button
        type="submit"
        className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition-colors inline-block"
      >
        Submit Project
      </button>
    </form>
  );
};

export default ProjectSubmissionForm;