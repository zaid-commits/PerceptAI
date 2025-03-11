import FloatingNavbar from "@/components/Navbar";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileCode, Image, FileText, Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import Footer from "@/components/Footer";

const SubmitOpenCv = () => {
  const [projectName, setProjectName] = useState("");
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [descFile, setDescFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName || !mainFile || !imageFile || !descFile) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("project_name", projectName);
    formData.append("main.py", mainFile);
    formData.append("image.png", imageFile);
    formData.append("description.txt", descFile);

    try {
      const response = await fetch("http://localhost:5050/opencv/project/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Reset form
        setProjectName("");
        setMainFile(null);
        setImageFile(null);
        setDescFile(null);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error("Failed to submit project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <FloatingNavbar />
      
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-[#1a1a1a] border border-gray-700 shadow-lg rounded-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-white">
                Submit OpenCV Project
              </CardTitle>
              <CardDescription className="text-gray-400">
                Share your computer vision project with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Project Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter project name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="bg-[#2a2a2a] border-gray-600 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {/* Main Python File */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Main Python File (.py)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-2 p-3 rounded-lg bg-[#2a2a2a] border border-gray-600">
                      <FileCode className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-400 text-sm truncate">
                        {mainFile?.name || "No file selected"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-600 hover:bg-purple-500 hover:text-white"
                      onClick={() => document.getElementById("mainFile")?.click()}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                    <input
                      id="mainFile"
                      type="file"
                      accept=".py"
                      onChange={(e) => handleFileChange(e, setMainFile)}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Image File */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Project Image (.png)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-2 p-3 rounded-lg bg-[#2a2a2a] border border-gray-600">
                      <Image className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-400 text-sm truncate">
                        {imageFile?.name || "No file selected"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-600 hover:bg-purple-500 hover:text-white"
                      onClick={() => document.getElementById("imageFile")?.click()}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                    <input
                      id="imageFile"
                      type="file"
                      accept="image/png"
                      onChange={(e) => handleFileChange(e, setImageFile)}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Description File */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Project Description (.txt)
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-2 p-3 rounded-lg bg-[#2a2a2a] border border-gray-600">
                      <FileText className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-400 text-sm truncate">
                        {descFile?.name || "No file selected"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-gray-600 hover:bg-purple-500 hover:text-white"
                      onClick={() => document.getElementById("descFile")?.click()}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                    <input
                      id="descFile"
                      type="file"
                      accept=".txt"
                      onChange={(e) => handleFileChange(e, setDescFile)}
                      className="hidden"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Project"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SubmitOpenCv;