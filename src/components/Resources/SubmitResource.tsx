import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingNavbar from "../Navbar";
import Footer from "../Footer";
import Promo from "../promo";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { Button } from "../ui/button";

const SubmitResource: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [detailedDescription, setDetailedDescription] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    setLoading(true);
    const resource = {
      title,
      description,
      link,
      category,
      author: user.fullName,
      posterImage: user.imageUrl,
      posterUsername: user.fullName,
      detailedDescription,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const response = await fetch("http://localhost:5000/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resource),
      });
      if (response.ok) {
        navigate("/resources");
      } else {
        console.error("Failed to submit resource");
      }
    } catch (error) {
      console.error("Error submitting resource:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#000] text-white min-h-screen py-10">
      <FloatingNavbar />
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-[#161618] text-white border border-[#8080807a] shadow-lg">
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-8">Submit a Resource to PerceptAI</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                placeholder="Enter the title here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Textarea
                placeholder="Enter a brief description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Textarea
                placeholder="Enter a detailed description"
                value={detailedDescription}
                onChange={(e) => setDetailedDescription(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Input
                type="text"
                placeholder="Enter the link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Select onValueChange={(value: string) => setCategory(value)} required>
                <SelectTrigger className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
                  <span>{category || "Select a category for your project"}</span>
                </SelectTrigger>
                <SelectContent className="bg-[#1f1f1f] border border-gray-700">
                  <SelectItem value="AI" className="text-gray-400">AI</SelectItem>
                  <SelectItem value="Computer Vision" className="text-gray-400">Computer Vision</SelectItem>
                  <SelectItem value="Machine Learning" className="text-gray-400">Machine Learning</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="text"
                placeholder="Enter tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <Button
                type="submit"
                className={`w-full p-3 rounded-md bg-purple-900 text-white hover:bg-purple-700 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Promo />
      <Footer />
    </div>
  );
};

export default SubmitResource;
