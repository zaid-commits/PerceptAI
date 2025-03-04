// Language: TypeScript (TSX)
// filepath: /d:/Projects/PerceptAI Ends/PerceptAI/src/components/Projects/SubmitProject.tsx
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { submitProject } from "@/api";
import FloatingNavbar from "../Navbar";
import { Button } from "../ui/button";
import Footer from "../Footer";
import toast from "react-hot-toast";

const SubmitProject = () => {
  const { user } = useUser(); // Get the authenticated user
  const userEmail = user?.primaryEmailAddress?.emailAddress || "hello123"; // Get current user's email
  const userName = user?.username || ""; // Get first name (fallback empty)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postedBy: userName, // Auto-fill from Clerk
    email: userEmail, // Submitted primary user email
    collaboratorEmail: userEmail, // Save current user's email for collaboration
    codeLink: "",
    category: "",
    tags: "",
    elaboratedDescription: "",
    coverImage: "",
  });

  // Handle changes dynamically
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare project data with tags as an array
    const projectData = {
      ...formData,
      tags: formData.tags.split(","),
      email: userEmail, // Submit current user's email
      collaboratorEmail: userEmail, // Submit current user's email for collaboration
    };

    // Log the project data before submitting
    console.log("Submitting project data:", projectData);

    // Send project data to the database, including the email
    await submitProject(projectData);
    toast.success("Project submitted successfully!");
  };

  return (
    <>
      <div className="bg-black h-screen text-white flex flex-col">
        <FloatingNavbar />
        <div className="flex-grow flex items-center justify-center text-black">
          <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-black text-center">
              Submit a New Project
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="description"
                placeholder="Short Description"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <textarea
                name="elaboratedDescription"
                placeholder="Elaborated Description"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              
              {/* Auto-filled postedBy field (disabled for users) */}
              <input
                type="text"
                name="postedBy"
                value={userName}
                disabled
                className="w-full border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
              />

              {/* Auto-filled email field (disabled for users) */}
              <input
                type="email"
                name="email"
                value={userEmail}
                disabled
                className="w-full border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed"
              />
              
              <input
                type="text"
                name="codeLink"
                placeholder="GitHub/Code Link"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                name="coverImage"
                placeholder="Cover Image URL"
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />

              <Button type="submit" variant="outline" className="w-full bg-black hover:bg-black hover:text-white">
                Submit Project  
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <Footer />
      </div>
    </>
  );
};

export default SubmitProject;