import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";

const CollaboratorRecruitmentForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to post a project.");
      return;
    }

    const projectData = {
      title,
      description,
      requiredSkills,
      contactEmail,
      postedBy: user.username || user.fullName || "Anonymous",
    };

    try {
      const response = await axios.post('http://localhost:5000/api/collaborator', projectData);
      if (response.status === 201) {
        toast.success("Project posted successfully!");
        setTitle("");
        setDescription("");
        setRequiredSkills("");
        setContactEmail("");
      }
    } catch (error) {
      toast.error("Failed to post project. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
      <Card className="bg-[#0c0c0c] text-white border border-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a Project Idea</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-[#1f1f1f] border border-gray-800 text-white"
            />
            <Textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-[#1f1f1f] border border-gray-800 text-white"
            />
            <Input
              type="text"
              placeholder="Required Skills (comma separated)"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              required
              className="bg-[#1f1f1f] border border-gray-800 text-white"
            />
            <Input
              type="email"
              placeholder="Contact Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              className="bg-[#1f1f1f] border border-gray-800 text-white"
            />
            <Button type="submit" className="bg-purple-800 hover:bg-purple-900">
              Post Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaboratorRecruitmentForm;