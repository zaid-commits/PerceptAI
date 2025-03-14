import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import FloatingNavbar from "@/components/Navbar";
import Promo from "@/components/promo";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileCode2, Send, Users, Mail, BrainCircuit } from "lucide-react";

const CollaboratorRecruitmentForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Please enter a project title");
      return false;
    }
    if (!description.trim()) {
      toast.error("Please enter a project description");
      return false;
    }
    if (!requiredSkills.trim()) {
      toast.error("Please enter required skills");
      return false;
    }
    if (!contactEmail.trim()) {
      toast.error("Please enter a contact email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to post a project.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const projectData = {
      title: title.trim(),
      description: description.trim(),
      requiredSkills: requiredSkills.split(',').map(skill => skill.trim()).filter(Boolean),
      contactEmail: contactEmail.trim(),
      postedBy: user.username || user.fullName || "Anonymous",
    };

    try {
      const response = await fetch("https://ts-backend-6swe.onrender.com/api/collaborator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit project");
      }

      
      // Reset form
      setTitle("");
      setDescription("");
      setRequiredSkills("");
      setContactEmail("");

    } catch (error) {
      console.error("Error submitting collaborator data:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <FloatingNavbar />
      
      <div className="flex-grow container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
            Share Your Project Vision
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Connect with talented developers and transform your ideas into reality
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="bg-zinc-900 shadow-xl rounded-2xl overflow-hidden border border-purple-900/20">
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-bold flex items-center gap-3 text-white">
                  <FileCode2 className="w-8 h-8 text-purple-500" />
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Project Title</label>
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="Give your project a clear, descriptive title"
                      className="bg-zinc-900 text-white border-purple-900/30 focus:border-purple-500 py-5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Project Description</label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      placeholder="Describe your project, its goals, and what you're looking to achieve"
                      className="bg-zinc-900 text-white border-purple-900/30 focus:border-purple-500 min-h-[180px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Required Skills</label>
                    <Input
                      type="text"
                      value={requiredSkills}
                      onChange={(e) => setRequiredSkills(e.target.value)}
                      required
                      placeholder="e.g., React, Node.js, Python (comma separated)"
                      className="bg-zinc-900 text-white border-purple-900/30 focus:border-purple-500 py-5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Contact Email</label>
                    <Input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      placeholder="Your email for project communications"
                      className="bg-zinc-900 text-white border-purple-900/30 focus:border-purple-500 py-5"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-medium rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⌛</span>
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Post Project
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-900/20 hover:border-purple-500/30 transition-colors duration-200">
              <Users className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Find Collaborators</h3>
              <p className="text-gray-400">Connect with skilled developers who share your passion and vision for innovation</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-900/20 hover:border-purple-500/30 transition-colors duration-200">
              <BrainCircuit className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Share Ideas</h3>
              <p className="text-gray-400">Transform your innovative concepts into tangible solutions with the perfect team</p>
            </div>

            <div className="bg-zinc-900 p-6 rounded-2xl border border-purple-900/20 hover:border-purple-500/30 transition-colors duration-200">
              <Mail className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Easy Communication</h3>
              <p className="text-gray-400">Seamless collaboration through direct communication channels</p>
            </div>
          </motion.div>
        </div>
      </div>

      <Promo />
      <Footer />
    </div>
  );
};

export default CollaboratorRecruitmentForm;