import { useEffect, useState } from "react";
import FloatingNavbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const API_URL = "https://ztbm3dqt-5050.inc1.devtunnels.ms/"; // Backend URL
const FALLBACK_IMAGE_URL = "./logo.jpg"; // Fallback image URL

interface Project {
    name: string;
    image: string | null;
    description: string;
}

const VisionProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const handleRunProject = async (projectName: string) => {
        try {
            const response = await fetch(`${API_URL}/run/${projectName}`);
            const data = await response.json();
            toast.success(data.message || data.error);
        } catch (error) {
            toast.error("Failed to start the project.");
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
                            <FloatingNavbar />

            <div className="max-w-7xl mx-auto px-4 py-12 pt-[10rem]">
                <h2 className="text-3xl font-bold mb-6 text-white text-center">
                    PerceptAI Vision Directory
                </h2>

                {/* Submit Button */}
                <div className="flex justify-end mb-6">
                    <Link to="/opencv/submit">
                        <Button variant="outline" className="text-black text-sm px-4 py-2">
                            Submit Yours
                        </Button>
                    </Link>
                </div>

                {/* Loading & Error Handling */}
                {loading ? (
                    <p className="text-white text-center">Loading projects...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4">
                        {projects.map((project, index) => (
                            <div key={index} className="break-inside-avoid mb-4">
                                <button
                                    onClick={() => handleRunProject(project.name)}
                                    className="group block w-full transition-transform duration-300 hover:scale-[1.02]"
                                >
                                    <Card className="relative bg-[#1a1a1a] text-white border border-gray-700 rounded-lg overflow-hidden 
                                    shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                                        {/* Dynamic Image Height */}
                                        <img
                                            src={project.image ? `${API_URL}${project.image}` : FALLBACK_IMAGE_URL}
                                            alt={project.name}
                                            className="w-full object-cover rounded-t-lg"
                                            style={{ height: `${Math.floor(Math.random() * (280 - 180) + 180)}px` }} 
                                        />

                                        {/* Project Details */}
                                        <CardHeader className="p-4">
                                            <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                                            <CardDescription className="text-gray-400 text-sm">
                                                {project.description}
                                            </CardDescription>

                                            {/* Run Button */}
                                            <button 
                                                className="w-full mt-3 py-1 text-xs rounded-md text-white border
                                                hover:bg-white/20 hover:text-white transition-all duration-300"
                                            >
                                                Run Project 🚀
                                            </button>
                                        </CardHeader>
                                    </Card>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default VisionProjects;
