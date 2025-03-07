// Language: TypeScript (TSX)
// filepath: /d:/Projects/PerceptAI Ends/PerceptAI/src/components/Projects/SubmitProject.tsx
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { submitProject } from "@/api";
import FloatingNavbar from "../Navbar";
import { Button } from "../ui/button";
import Footer from "../Footer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { 
  FileCode2, 
  Send,
  Github, Globe
} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

const SubmitProject = () => {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";
  const userName = user?.username || "";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    elaboratedDescription: "",
    postedBy: userName,
    email: userEmail,
    collaboratorEmail: userEmail,
    githubUrl: "",
    liveUrl: "",
    category: "",
    tags: [] as string[],
    coverImage: "",
    techStack: [] as string[],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [currentTech, setCurrentTech] = useState("");

  const handleAddTag = () => {
    if (currentTag && !formData.tags.includes(currentTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }));
      setCurrentTag("");
    }
  };

  const handleAddTech = () => {
    if (currentTech && !formData.techStack.includes(currentTech)) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, currentTech]
      }));
      setCurrentTech("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleRemoveTech = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitProject(formData);
      toast.success("Project submitted successfully!");
      // Reset form or redirect
    } catch (error) {
      toast.error("Failed to submit project");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingNavbar />
      
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-zinc-900 border-white/10">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white/80 flex items-center gap-3">
                <FileCode2 className="w-8 h-8 text-white/80" />
                Submit Your Project
              </CardTitle>
              <CardDescription className="text-white/60 text-lg">
                Share your innovation with our community of developers
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white/90">Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Project Title</label>
                      <Input
                        name="title"
                        placeholder="Enter project title"
                        className="bg-black border-white/20 text-white placeholder:text-white/40"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Short Description</label>
                      <Textarea
                        name="description"
                        placeholder="Brief overview of your project"
                        className="bg-black border-white/20 text-white placeholder:text-white/40 min-h-[100px]"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Detailed Description</label>
                      <Textarea
                        name="elaboratedDescription"
                        placeholder="Detailed explanation of your project"
                        className="bg-black border-white/20 text-white placeholder:text-white/40 min-h-[200px]"
                        value={formData.elaboratedDescription}
                        onChange={(e) => setFormData({ ...formData, elaboratedDescription: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Links Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white/90">Project Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <Github className="inline w-4 h-4 mr-2" />
                        GitHub Repository
                      </label>
                      <Input
                        name="githubUrl"
                        placeholder="https://github.com/username/repo"
                        className="bg-black border-white/20 text-white placeholder:text-white/40"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        <Globe className="inline w-4 h-4 mr-2" />
                        Live Demo URL
                      </label>
                      <Input
                        name="liveUrl"
                        placeholder="https://your-demo.com"
                        className="bg-black border-white/20 text-white placeholder:text-white/40"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Tags and Tech Stack */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Tags</label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        className="bg-black border-white/20 text-white placeholder:text-white/40"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      />
                      <Button type="button" onClick={handleAddTag} variant="outline" className="border-white/20 text-white">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-white/10 hover:bg-white/20 cursor-pointer"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Tech Stack</label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Add technology"
                        value={currentTech}
                        onChange={(e) => setCurrentTech(e.target.value)}
                        className="bg-black border-white/20 text-white placeholder:text-white/40"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
                      />
                      <Button type="button" onClick={handleAddTech} variant="outline" className="border-white/20 text-white">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          className="bg-white/10 hover:bg-white/20 cursor-pointer"
                          onClick={() => handleRemoveTech(tech)}
                        >
                          {tech} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-black py-6 text-lg font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Project
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitProject;