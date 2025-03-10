import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import FloatingNavbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Search, Filter, Briefcase, Star, Clock, Users, ChevronRight } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  contactEmail: string;
  createdAt?: string;
  teamSize?: number;
  difficulty?: string;
}

const ProjectListing: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [githubLink, setGithubLink] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills,] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/collaborator");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleApply = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSubmitApplication = async () => {
    if (!selectedProject) return;

    if (!githubLink || !skills || !message) {
      toast.error("Please fill in all fields");
      return;
    }

    const applicationData = {
      projectId: selectedProject._id,
      githubLink,
      skills: skills.split(",").map((skill) => skill.trim()),
      message,
      applicantEmail: "user@example.com",
    };

    const mailtoLink = `mailto:${selectedProject.contactEmail}?subject=Collaboration Request for ${selectedProject.title}&body=Hi, I am interested in collaborating on your project '${selectedProject.title}'.%0D%0A%0D%0AYou can see my past experiences through my GitHub profile which is available at ${applicationData.githubLink}.%0D%0AMy skill set includes ${applicationData.skills.join(", ")}.%0D%0A%0D%0A${applicationData.message}%0D%0A%0D%0AThis request is made through PerceptAI - AI Infused Vision Directory.%0D%0A%0D%0AThank you!`;

    window.location.href = mailtoLink;
    toast.success("Application submitted successfully!");

    setSelectedProject(null);
    setGithubLink("");
    setSkills("");
    setMessage("");
  };

  const getTimeAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMilliseconds = now.getTime() - created.getTime();
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 || 
                         project.requiredSkills.some(skill => selectedSkills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="bg-gradient-to-b from-black via-[#0c0c0c] to-black text-white min-h-screen">
      <FloatingNavbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-24 mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            Discover & Collaborate
          </h1>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Join innovative projects, connect with talented developers, and build something amazing together
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search projects by title, description, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 bg-[#0c0c0c] border-gray-800 text-white w-full focus:ring-2 focus:ring-purple-500 rounded-xl"
              />
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0c0c0c] border border-gray-800 rounded-lg px-4 py-2 text-gray-300 focus:ring-2 focus:ring-purple-500"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="difficulty">Difficulty</option>
              </select>
              <Button variant="outline" className="border-gray-800 text-gray-300">
                <Filter className="mr-2" size={18} />
                Filters
              </Button>
            </div>
          </div>
          <Link to="/projects/collaborator/submit">
            <Button variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl">
              <Briefcase className="mr-2" size={20} />
              Post Your Project
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="bg-[#0c0c0c] border border-gray-800 rounded-xl shadow-lg hover:shadow-purple-900/20 hover:border-purple-500/50 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <CardTitle className="text-2xl font-bold text-white">
                        {project.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Star className="text-yellow-500" size={16} />
                        <span className="text-gray-400 text-sm">Featured</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{project.createdAt ? getTimeAgo(project.createdAt) : 'Recently'}</span>
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        <span>2-4 people</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-gray-300 mb-6 line-clamp-3 flex-grow">{project.description}</p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.requiredSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handleApply(project);
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors rounded-lg py-6 flex items-center justify-center"
                      >
                        Apply to Collaborate
                        <ChevronRight size={18} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl"
            >
              <Card className="bg-[#0c0c0c] border border-gray-800 shadow-2xl rounded-xl">
                <CardHeader className="border-b border-gray-800 pb-6">
                  <CardTitle className="text-3xl font-bold text-white mb-2">
                    Apply to {selectedProject.title}
                  </CardTitle>
                  <p className="text-gray-400">Fill out the form below to express your interest in collaborating</p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">GitHub Profile</label>
                    <Input
                      type="text"
                      placeholder="https://github.com/yourusername"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="bg-black border-gray-800 text-white focus:ring-2 focus:ring-purple-500 py-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Your Skills</label>
                    <Input
                      type="text"
                      placeholder="e.g., React, Node.js, Python (comma separated)"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="bg-black border-gray-800 text-white focus:ring-2 focus:ring-purple-500 py-6"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Cover Message</label>
                    <Textarea
                      placeholder="Tell us about your interest in this project, relevant experience, and what you can contribute..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="bg-black border-gray-800 text-white min-h-[160px] focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-8">
                    <Button
                      onClick={() => setSelectedProject(null)}
                      variant="outline"
                      className="bg-transparent border border-gray-800 text-gray-300 hover:bg-black px-6"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmitApplication}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                    >
                      Submit Application
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectListing;