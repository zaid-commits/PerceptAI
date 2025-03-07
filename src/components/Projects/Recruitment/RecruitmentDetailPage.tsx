import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import FloatingNavbar from "@/components/Navbar";
import Promo from "@/components/promo";
import Footer from "@/components/Footer";

interface Project {
  _id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  contactEmail: string;
  postedBy: string;
  timeline: string;
  budget: string;
  collaborators: number;
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
        const response = await axios.get(
          `https://ztbm3dqt-5000.inc1.devtunnels.ms/api/collaborator/${id}`
        );
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
    const mailtoLink = `mailto:${
      project.contactEmail
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  if (!project) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  const projectDetails = [
    { title: "Description", content: project.description },
    { title: "Required Skills", content: project.requiredSkills.join(", ") },
    { title: "Posted By", content: project.postedBy },
    { title: "Contact Email", content: project.contactEmail },
    // { title: "Timeline", content: project.timeline },
    // { title: "Budget", content: project.budget },
    // { title: "Collaborators Needed", content: project.collaborators.toString() },
  ];

  const benefits = [
    {
      title: "Networking with industry experts",
      content:
        "Collaborate and connect with professionals in the industry, expanding your network and learning from experienced individuals.",
    },
    {
      title: "Hands-on experience with cutting-edge technology",
      content:
        "Gain practical experience by working on real-world projects that utilize the latest advancements in AI and technology.",
    },
    {
      title: "Skill Development",
      content:
        "Enhance your skills in software development, project management, and teamwork by contributing to meaningful projects.",
    },
    {
      title: "Career Advancement",
      content:
        "Boost your resume and increase your job prospects by showcasing your contributions to high-impact projects.",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Project Details Section */}
            <Card className="bg-[#0c0c0c] text-white border border-gray-700 rounded-lg shadow-xl col-span-2 p-8 transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-gray-300 mb-4">
              {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 text-gray-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectDetails.map((detail, index) => (
                <Card
                key={index}
                className="bg-[#1f1f1f] text-white border border-gray-700 rounded-lg shadow p-6"
                >
                <CardHeader>
                  <CardTitle className="text-lg font-bold mb-2">
                  {detail.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{detail.content}</p>
                </CardContent>
                </Card>
              ))}
              </div>
            </CardContent>
            </Card>

          {/* Application Form Section */}
          <Card className="bg-[#0c0c0c] text-white border border-gray-700 rounded-lg shadow-xl p-6 transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-300">
                Apply to Collaborate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="text"
                placeholder="GitHub Link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                className="bg-[#1f1f1f] border border-gray-700 text-white transition-colors hover:border-gray-500"
              />
              <Input
                type="text"
                placeholder="Your Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="bg-[#1f1f1f] border border-gray-700 text-white transition-colors hover:border-gray-500"
              />
              <Textarea
                placeholder="Message to the Project Owner"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-[#1f1f1f] border border-gray-700 text-white transition-colors hover:border-gray-500"
              />
              <Button
                onClick={handleSubmitApplication}
                className="w-full bg-gray-700 hover:bg-gray-800 py-3 font-semibold transition-transform transform hover:scale-105"
              >
                Submit Application
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-300 text-center mt-4 pt-10">
            Why Join Project <span className="text-purple-800">{project.title}?</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Collaborating on this project provides an opportunity to work with
            industry professionals, improve your coding skills, and gain
            real-world experience in AI-driven solutions.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-[#0c0c0c] text-white border border-gray-700 rounded-lg shadow-xl p-4 transition-transform transform hover:scale-105 hover:bg-[#1a1a1a]"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-300">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400 text-sm">
                <p>{benefit.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Promo/>
      <Footer/>
    </div>
  );
};

export default RecruitmentDetailPage;
