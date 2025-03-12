import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingNavbar from "../Navbar";
import Promo from "../promo";
import Footer from "../Footer";
import { Search, Code2, Sparkles, Clock, ChevronRight, Star, Users, Eye, BrainCircuit, Smartphone, Link as LinkIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { fetchProjects } from "@/api";
import ModernPurpleLoader from "../elements/Loader";

interface Project {
  _id: string; // Changed from id to _id to match backend
  title: string;
  description: string;
  tags: string[];
  category: string;
  coverImage: string;
  createdAt: string;
  views?: number;
  stars?: number;
  collaborators?: number;
  id: string;
}

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", name: "All Projects", icon: Sparkles },
    { id: "ai", name: "AI/ML", icon: BrainCircuit },
    { id: "web", name: "Web Development", icon: Code2 },
    { id: "mobile", name: "Mobile Apps", icon: Smartphone },
    { id: "blockchain", name: "Blockchain", icon: LinkIcon },
  ];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        const projectsWithStats = data.map((project: Project) => ({
          ...project,
          views: Math.floor(Math.random() * 1000),
          stars: Math.floor(Math.random() * 100),
          collaborators: Math.floor(Math.random() * 10)
        }));
        setProjects(projectsWithStats);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleProjectClick = (projectId: string) => {
    if (projectId) {
      navigate(`/projects/${projectId}`);
    }
  };

  if (loading) return <ModernPurpleLoader />;

  return (
    <div className="bg-black min-h-screen">
      <FloatingNavbar />

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white">
            Discover Amazing Projects
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore innovative projects from our vibrant community of developers and creators
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 bg-[#111] border-gray-800 focus:border-white text-white w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-[#111] hover:bg-[#222] border border-gray-800"
                  } px-6 py-6 rounded-xl whitespace-nowrap flex items-center gap-2 shadow-lg transition-all duration-300`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project._id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => handleProjectClick(project._id)}
            >
              <Card className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-white/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10">
                <div className="relative">
                  <img
                    src={project.coverImage || "/default-project.jpg"}
                    alt={project.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-6 text-sm text-white/90">
                    <span className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4" /> {project.views}
                    </span>
                    <span className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4" /> {project.stars}
                    </span>
                    <span className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                      <Users className="w-4 h-4" /> {project.collaborators}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-white text-black px-3 py-1">
                      {project.category}
                    </Badge>
                    <span className="text-gray-400 text-sm flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        className="bg-[#222] text-white border border-gray-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-white hover:bg-gray-200 text-black flex items-center justify-center gap-2 group-hover:scale-105 transition-all duration-300 py-6"
                  >
                    View Details
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Submit Project CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-[#111] p-12 rounded-2xl border border-gray-800 shadow-2xl">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Have a Project to Share?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our community of innovators and showcase your work to thousands of passionate developers
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/projects/submit">
                <Button className="bg-white hover:bg-gray-200 text-black px-10 py-6 text-lg w-full sm:w-auto shadow-lg transition-all duration-300">
                  Submit Your Project
                </Button>
              </Link>
              <Link to="/projects/collaborator">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-6 text-lg w-full sm:w-auto shadow-lg transition-all duration-300">
                  Looking for Collaborators?
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Promo />
      <Footer />
    </div>
  );
};

export default Projects;