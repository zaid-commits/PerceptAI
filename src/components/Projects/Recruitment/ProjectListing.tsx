import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

interface Project {
  _id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  contactEmail: string;
}

const ProjectListing: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [githubLink, setGithubLink] = useState("");
  const [skills, setSkills] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/collaborator");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects. Please try again later.");
      }
    };

    fetchProjects();
  }, []);

  const handleApply = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSubmitApplication = async () => {
    if (!selectedProject) return;

    const applicationData = {
      projectId: selectedProject._id,
      githubLink,
      skills: skills.split(",").map((skill) => skill.trim()),
      message,
      applicantEmail: "user@example.com", // Replace with the logged-in user's email
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/collaborator/${selectedProject._id}/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(applicationData),
        }
      );

      if (response.ok) {
        alert("Application submitted successfully!");
        setSelectedProject(null);
        setGithubLink("");
        setSkills("");
        setMessage("");
      } else {
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">Find Collaborators for Your Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project._id} className="bg-[#0c0c0c] text-white border border-gray-800 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <p className="text-sm text-gray-400">
                <strong>Required Skills:</strong> {project.requiredSkills.join(", ")}
              </p>
              <Button
                onClick={() => handleApply(project)}
                className="mt-4 bg-purple-800 hover:bg-purple-900"
              >
                Apply to Collaborate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Application Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="bg-[#0c0c0c] text-white border border-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Apply to {selectedProject.title}</CardTitle>
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
              <div className="flex justify-end space-x-2">
                <Button
                  onClick={() => setSelectedProject(null)}
                  className="bg-gray-700 hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitApplication}
                  className="bg-purple-800 hover:bg-purple-900"
                >
                  Submit Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProjectListing;