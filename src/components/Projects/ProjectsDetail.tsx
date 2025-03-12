import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FloatingNavbar from "../Navbar";
import Footer from "../Footer";
import { Badge } from "@/components/ui/badge";
import { fetchProjectById } from "@/api";
import ModernPurpleLoader from "../elements/Loader";
import { 
  Calendar, Users, Github, Globe, ChevronLeft, Star,
   Share2, BookOpen,  Eye,
  ArrowUpRight,  Heart, Bookmark,
  FileCode2, Terminal, GitBranch, Coffee
} from "lucide-react";
import { toast } from "react-hot-toast";

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
  demoVideo?: string;
  techStack?: string[];
  features?: string[];
  postedBy: string;
  author?: {
    name: string;
    avatar: string;
    role: string;
  };
  collaborators?: number;
  downloads?: number;
  likes?: number;
  views?: number;
  stars?: number;
  forks?: number;
  sponsors?: number;
}

const defaultProject: Project = {
  _id: "default",
  title: "Untitled Project",
  description: "No description available",
  elaboratedDescription: "No detailed description available",
  coverImage: "/fallback-cover.jpg",
  tags: [],
  category: "Uncategorized",
  createdAt: new Date().toISOString(),
  techStack: [],
  features: [],
  postedBy: "Anonymous"
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project>({...defaultProject});
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      try {
        if (id) {
          const data = await fetchProjectById(id);
          if (data) {
            setProject({ ...defaultProject, ...data });
          } else {
            toast.error("Project not found");
          }
        }
      } catch (error) {
        console.error("Failed to load project:", error);
        toast.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  if (loading) return <ModernPurpleLoader />;

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24">
        <Link to="/projects">
          <Button variant="ghost" className="text-white/70 hover:text-white mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/fallback-cover.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        {/* Project Header */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <Badge className="bg-white/10 text-white mb-4">
              {project.category}
            </Badge>
            <h1 className="text-5xl font-bold text-white mb-6">
              {project.title}
            </h1>

            {/* Project Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {project.views || 0} views
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                {project.stars || 0} stars
              </div>
              {project.collaborators && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {project.collaborators} collaborators
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage 
                      src={project.author?.avatar} 
                      alt={project.author?.name || project.postedBy}
                    />
                    <AvatarFallback>
                      {(project.author?.name || project.postedBy)[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-medium">
                      {project.author?.name || project.postedBy}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {project.author?.role || "Project Creator"}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="text-black border-white/20">
                  Follow
                </Button>
              </div>
            </motion.div>

            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Project Overview
              </h2>
              <p className="text-white/80 leading-relaxed mb-8">
                {project.description || "No description available"}
              </p>
              <div className="prose prose-invert max-w-none text-white/80"> 
                {project.elaboratedDescription || "No detailed description available"}
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {((project?.features && project.features.length > 0) 
                  ? project.features 
                  : ["No features listed"]
                ).map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      <ArrowUpRight className="w-4 h-4 text-white/60" />
                    </div>
                    <p className="text-white/80">{feature}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <FileCode2 className="w-5 h-5" />
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {((project?.techStack && project.techStack.length > 0)
                  ? project.techStack 
                  : ["No technologies specified"]
                ).map((tech, index) => (
                  <Badge
                    key={index}
                    className="bg-white/10 text-white hover:bg-white/20 px-4 py-2"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  variant="outline"
                  className={`flex-1 gap-2 ${isLiked ? 'bg-white text-black' : 'text-black/70'}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  variant="outline"
                  className={`flex-1 gap-2 ${isBookmarked ? 'bg-white text-black' : 'text-white/70'}`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  Save
                </Button>
              </div>
              
              {/* Project Links */}
              <div className="space-y-4">
                {project.githubUrl && (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
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
                  <span className="block text-xl font-bold text-white">{project.stars || 0}</span>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <GitBranch className="w-5 h-5 text-white/80 mx-auto mb-2" />
                  <span className="block text-sm text-white/60">Forks</span>
                  <span className="block text-xl font-bold text-white">{project.forks || 0}</span>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Users className="w-5 h-5 text-white/80 mx-auto mb-2" />
                  <span className="block text-sm text-white/60">Contributors</span>
                  <span className="block text-xl font-bold text-white">{project.collaborators || 0}</span>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Coffee className="w-5 h-5 text-white/80 mx-auto mb-2" />
                  <span className="block text-sm text-white/60">Sponsors</span>
                  <span className="block text-xl font-bold text-white">{project.sponsors || 0}</span>
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
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Link copied to clipboard!");
                }}
              >
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetail;