import React, { useState, useEffect } from "react";
import FloatingNavbar from "../Section1/Navbar/Navbar";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const SubmitResource: React.FC = () => {
  const { user } = useUser();
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
    posterImage: "",
    posterUsername: ""
  });

  useEffect(() => {
    if (user) {
      setNewResource((prev) => ({
        ...prev,
        posterImage: user.imageUrl || "",
        posterUsername: user.username || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resourceToSubmit = {
        ...newResource,
        posterImage: user?.imageUrl || "",
        posterUsername: user?.username || "",
      };
      const response = await fetch(
        "http://localhost:5000/api/resources",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resourceToSubmit),
        }
      );
      const data = await response.json();
      setNewResource({
        title: "",
        description: "",
        link: "",
        category: "",
        posterImage: user?.imageUrl || "",
        posterUsername: user?.username || "",
      });
      toast.success("Resource added successfully!");
      console.log("Resource added:", data);
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  return (
    <div className="bg-black py-20 min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Submit a New Resource
        </h2>
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-black border-l-2 border-b  border-purple-800   p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              value={newResource.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="block w-full mb-2 p-2 rounded  text-white border-purple-800 border-l-2 border-1-2 border-b bg-black focus:outline-none focus:ring-1 focus:ring-purple-600"
              required
            />
            <input
              type="text"
              name="description"
              value={newResource.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="block w-full mb-2 p-2 rounded  text-white border-purple-800 border-l-2 border-1-2 border-b bg-black focus:outline-none focus:ring-1 focus:ring-purple-600"
              required
            />
            <input
              type="text"
              name="link"
              value={newResource.link}
              onChange={handleInputChange}
              placeholder="Link"
              className="block w-full mb-2 p-2 rounded  text-white border-purple-800 border-l-2 border-1-2 border-b bg-black focus:outline-none focus:ring-1 focus:ring-purple-600"
              required
            />
            <input
              type="text"
              name="category"
              value={newResource.category}
              onChange={handleInputChange}
              placeholder="Category"
              className="block w-full mb-2 p-2 rounded  text-white border-purple-800 border-l-2 border-1-2 border-b bg-black focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            <input
              type="text"
              name="posterImage"
              value={newResource.posterImage}
              readOnly
              placeholder="Poster Image URL"
              className="block w-full mb-2 p-2 rounded  text-white border-purple-800 border-l-2 border-1-2 border-b bg-black focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
            <input
              type="text"
              name="posterUsername" 
              value={newResource.posterUsername}
              readOnly
              placeholder="Poster Username"
              className="block w-full mb-2 p-2 rounded  text-white border-purple-800 border-l-2 border-1-2 border-b bg-black focus:outline-none focus:ring-1 focus:ring-purple-600"
            />


          </div>
          <div className="buttons flex justify-between">
            <button
              type="submit"
              className="bg-purple-800 text-white p-2 rounded mt-4 hover:bg-purple-700 transition-colors"
            >
              Add Resource
            </button>
            <Link
              to="/resources/"
              className="bg-purple-900 text-white p-2 rounded hover:bg-purple-700 transition-colors"
            >
              Back to resource page
            </Link>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default SubmitResource;