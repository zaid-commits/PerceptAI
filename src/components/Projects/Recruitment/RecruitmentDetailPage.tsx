import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import FloatingNavbar from "@/components/Navbar";

interface Project {
  _id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  contactEmail: string;
  postedBy: string;
}

const RecruitmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [githubLink, setGithubLink] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/collaborator/${id}`);
        setProject(response.data);
      } catch (error) {
        toast.error("Failed to fetch project details.");
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmitApplication = () => {
    if (!project) return;

    const subject = `Application for Project: ${project.title}`;
    const body = `GitHub Link: ${githubLink}\nSkills: ${skills}\nMessage: ${message}`;
    const mailtoLink = `mailto:${project.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  if (!project) {
    return <div className="bg-black text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-20">
        {/* Project Details Section */}
        <Card className="bg-[#0c0c0c] text-white border border-gray-800 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{project.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">{project.description}</p>
            <p className="text-sm text-gray-400">
              <strong>Required Skills:</strong> {project.requiredSkills.join(", ")}
            </p>
            <p className="text-sm text-gray-400">
              <strong>Posted By:</strong> {project.postedBy}
            </p>
            <p className="text-sm text-gray-400">
              <strong>Contact Email:</strong> {project.contactEmail}
            </p>
          </CardContent>
        </Card>

        {/* Application Form Section */}
        <Card className="bg-[#0c0c0c] text-white border border-gray-800 rounded-lg shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Apply to Collaborate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="GitHub Link"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              className="bg-[#1f1f1f] border border-gray-800 text-white"
            />
            <Input
              type="text"
              placeholder="Your Skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="bg-[#1f1f1f] border border-gray-800 text-white"
            />
            <Textarea
              placeholder="Message to the Project Owner"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-[#1f1f1f] border border-gray-800 text-white"
            />
            <Button
              onClick={handleSubmitApplication}
              className="bg-purple-800 hover:bg-purple-900"
            >
              Submit Application
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecruitmentDetailPage;