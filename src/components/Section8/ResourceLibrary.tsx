import React, { useState } from 'react';
import FloatingNavbar from '../Section1/Navbar/Navbar'; // Assuming the path is correct

interface Resource {
    title: string;
    description: string;
    link: string;
    category: string;
}

const resources: Resource[] = [
    {
        title: "Getting Started with Computer Vision",
        description: "A comprehensive guide to get you started with computer vision concepts.",
        link: "https://example.com/getting-started",
        category: "Tutorials"
    },
    {
        title: "OpenCV Documentation",
        description: "Official documentation for OpenCV, a powerful library for computer vision.",
        link: "https://docs.opencv.org/",
        category: "Documentation"
    },
    {
        title: "Image Datasets",
        description: "A collection of datasets for training and testing computer vision models.",
        link: "https://example.com/datasets",
        category: "Datasets"
    },
    {
        title: "Advanced Computer Vision Techniques",
        description: "Explore advanced techniques in computer vision and their applications.",
        link: "https://example.com/advanced-techniques",
        category: "Tutorials"
    },
];

const ResourceLibrary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-black py-20">
            <FloatingNavbar /> {/* Added navbar component */}
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Resource Library</h2>
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md mx-auto p-3 mb-8 rounded bg-gray-800 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((resource, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <h3 className="text-xl font-semibold text-purple-400">{resource.title}</h3>
                            <p className="text-gray-400 mt-2">{resource.description}</p>
                            <a href={resource.link} className="text-purple-400 mt-4 inline-block hover:underline">View Resource</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResourceLibrary;