import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { submitProject } from "@/api";
import FloatingNavbar from "../Navbar";
import { Button } from "../ui/button";
import Footer from "../Footer";

const SubmitProject = () => {
  const { user } = useUser(); // Get the authenticated user
  const userEmail = user?.primaryEmailAddress || ""; // Ensure we have an email
  const userName = user?.firstName || ""; // Get first name (fallback empty)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postedBy: userName, // Auto-fill from Clerk
    email: userEmail, // Store email for backend
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
    
    // Ensure email is attached before submitting
    const projectData = { ...formData, tags: formData.tags.split(","), email: userEmail };

    await submitProject(projectData);
    alert("Project submitted successfully!");
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
              <input type="text" name="title" placeholder="Project Title" onChange={handleChange} className="w-full border p-2 rounded" required />
              <textarea name="description" placeholder="Short Description" onChange={handleChange} className="w-full border p-2 rounded" required />
              <textarea name="elaboratedDescription" placeholder="Elaborated Description" onChange={handleChange} className="w-full border p-2 rounded" required />
              
              {/* Auto-filled postedBy field (disabled for users) */}
              <input type="text" name="postedBy" value={userName} disabled className="w-full border p-2 rounded bg-gray-100 text-gray-600 cursor-not-allowed" />
              
              <input type="text" name="codeLink" placeholder="GitHub/Code Link" onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="text" name="tags" placeholder="Tags (comma separated)" onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="text" name="coverImage" placeholder="Cover Image URL" onChange={handleChange} className="w-full border p-2 rounded" required />

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
