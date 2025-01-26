import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingNavbar from "../Navbar";
import Footer from "../Footer";
import Promo from "../promo";

const SubmitResource: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [posterUsername, setPosterUsername] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resource = {
      title,
      description,
      link,
      category,
      author,
      posterImage,
      posterUsername,
      detailedDescription,
      tags: tags.split(",").map(tag => tag.trim())
    };

    try {
      const response = await fetch("http://localhost:5000/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resource)
      });
      if (response.ok) {
        navigate("/resources");
      } else {
        console.error("Failed to submit resource");
      }
    } catch (error) {
      console.error("Error submitting resource:", error);
    }
  };

  return (
    <div className="bg-[#000] text-white min-h-screen">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Submit a Resource</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <textarea
            placeholder="Detailed Description"
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
          <input
            type="text"
            placeholder="Poster Image URL"
            value={posterImage}
            onChange={(e) => setPosterImage(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="text"
            placeholder="Poster Username"
            value={posterUsername}
            onChange={(e) => setPosterUsername(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="block w-full p-2 rounded bg-[#161618] text-white border border-[#8080807a] focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            className="bg-purple-900 text-white p-2 rounded hover:bg-purple-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
      <Promo />
      <Footer />
    </div>
  );
};

export default SubmitResource;