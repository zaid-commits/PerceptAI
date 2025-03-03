import { useEffect, useState } from "react";
import FloatingNavbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Footer from "@/components/Footer";

const API_URL = "http://localhost:5050"; // Backend URL

interface Project {
    name: string;
    image: string | null;
}

const VisionProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch projects from Flask backend
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${API_URL}/`);
                const data = await response.json();

                if (data.projects) {
                    setProjects(data.projects);
                } else {
                    setError("No projects found");
                }
            } catch (err) {
                setError("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Run Python script when clicked
    const handleRunProject = async (projectName: string) => {
        try {
            const response = await fetch(`${API_URL}/run/${projectName}`);
            const data = await response.json();
            alert(data.message || data.error);
        } catch (error) {
            alert("Failed to start the project.");
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <div className="max-w-6xl mx-auto p-8">
                <FloatingNavbar />
                <h2 className="text-4xl font-bold mb-8 mt-16 text-white text-center">PerceptAI Vision Directory</h2>

                {loading ? (
                    <p className="text-white text-center">Loading projects...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
                        {projects.map((project) => (
                            <button
                                key={project.name}
                                onClick={() => handleRunProject(project.name)}
                                className="transform transition-transform duration-300 hover:scale-105"
                            >
                                <Card className="bg-black text-white border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl">
                                    {project.image ? (
                                        <img src={`${API_URL}${project.image}`} alt={project.name} className="w-full h-48 object-cover"/>
                                    ) : (
                                        <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-2xl font-semibold mb-2">{project.name}</CardTitle>
                                        <CardDescription className="text-gray-400 mb-4">
                                            Click to run this project.
                                        </CardDescription>
                                        <span className="text-blue-500 font-medium">Run Project</span>
                                    </CardHeader>
                                </Card>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default VisionProjects;
