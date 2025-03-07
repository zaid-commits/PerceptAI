import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingNavbar from "../Navbar";
import Footer from "../Footer";
import { Badge } from "@/components/ui/badge";
import { fetchProjectById } from "@/api";
import ModernPurpleLoader from "../elements/Loader";
import { 
  Calendar, 
  Users, 
  Github, 
  Globe, 
  ChevronLeft, 
  Star,
  MessageSquare,
  Share2,
  BookOpen,
  Code,
  
} from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  elaboratedDescription: string;
  coverImage: string;
  tags: string[];
  category: string;
  createdAt: string;
  githubUrl?: string;
  liveUrl?: string;
  author: {
    name: string;
    avatar: string;
  };
  collaborators?: number;
}

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (id) {
        const data = await fetchProjectById(id);
        setProject(data);
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  if (loading) {
    return <ModernPurpleLoader />;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1>Project not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />

      {/* Hero Section with Project Image */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Link 
              to="/projects"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <Badge className="bg-white/10 text-white mb-4 hover:bg-white/20">
              {project.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(project.createdAt).toLocaleDateString()}
              </div>
              {project.collaborators && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {project.collaborators} Collaborators
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Project Overview
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="prose prose-invert max-w-none">
                {project.elaboratedDescription}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Technical Details
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-white/10 text-white hover:bg-white/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Project Actions */}
            <div className="bg-white/5 rounded-xl p-6">
              <div className="space-y-4">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                )}
                {project.liveUrl && (
                  <Button
                    className="w-full bg-white text-black hover:bg-white/90"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    View Live Demo
                  </Button>
                )}
              </div>
            </div>

            {/* Project Stats */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Project Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Star className="w-5 h-5 text-white/80 mx-auto mb-2" />
                  <span className="block text-sm text-white/60">Stars</span>
                  <span className="block text-xl font-bold text-white">128</span>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-white/80 mx-auto mb-2" />
                  <span className="block text-sm text-white/60">Comments</span>
                  <span className="block text-xl font-bold text-white">24</span>
                </div>
              </div>
            </div>

            {/* Share Project */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Project
              </h3>
              <Button
                variant="outline"
                className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                Copy Link
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;