import FloatingNavbar from "@/components/Navbar";
import { useState } from "react";

const SubmitOpenCv = () => {
  const [projectName, setProjectName] = useState("");
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [descFile, setDescFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName || !mainFile || !imageFile || !descFile) {
      setMessage("All fields are required!");
      return;
    }

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
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Error submitting project");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
<FloatingNavbar/>
    <div className="p-6 border rounded-lg shadow-md bg-white text-black">
      <h2 className="text-xl font-bold">Submit OpenCV Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input type="file" accept=".py" onChange={(e) => handleFileChange(e, setMainFile)} />
        <input type="file" accept="image/png" onChange={(e) => handleFileChange(e, setImageFile)} />
        <input type="file" accept=".txt" onChange={(e) => handleFileChange(e, setDescFile)} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
    </div>
    // <Footer/>
  );
};

export default SubmitOpenCv;
