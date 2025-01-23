import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

const Gemini = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: string, text: string }[]>([]);
  const navigate = useNavigate();

  const context = `
  You are a chatbot for PerceptAI, an AI-infused vision directory with advanced AI & ML solutions including computer vision. The website has the following sections:
  
  - Home: The main landing page that introduces PerceptAI and its features.
  - Projects: A list of AI/ML projects where users can browse, submit, and explore various AI and ML projects.
  - Resources: A collection of resources for developers, including tutorials, documentation, and tools.
  - Contact: A page to contact the PerceptAI team for support, inquiries, or feedback.
  - Blogs: A section for blog posts where users can read and share articles related to AI and ML.
  - Community: A chatroom for users to interact, share ideas, and collaborate on projects.
  - Admin: An admin dashboard for managing the site, including user management, analytics, and newsletter management.
  
  PerceptAI aims to provide a comprehensive platform for AI enthusiasts and professionals to learn, create, and share AI and ML projects. The platform offers state-of-the-art machine learning models, open-source projects, and a thriving community.
  
  Your job is to assist users with information about PerceptAI, help them navigate the website, and provide support for their queries. You can also help users find specific projects, resources, or blog posts, and guide them to the appropriate sections of the website.
  
  Here are some example queries you might receive:
  - "How do I submit a project?"
  - "Can you show me the latest AI projects?"
  - "Where can I find resources for computer vision?"
  - "How do I contact the PerceptAI team?"
  - "What are the latest blog posts?"
  - "How do I join the community chatroom?"
  
  Remember to provide clear and concise answers, and guide users to the relevant sections of the website whenever necessary.
  `;

  const handleUserInput = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setLoading(true);

    const newChatHistory = [...chatHistory, { sender: "user", text: userInput }];
    setChatHistory(newChatHistory);

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error("API key is missing. Please set VITE_GOOGLE_API_KEY in the .env file.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `${context}\nUser: ${userInput}\nBot:`;

      const result = await model.generateContent(prompt);

      const responseText = result.response.text();

      // Check for navigation commands
      if (responseText.includes("navigate to")) {
        if (responseText.includes("home")) {
          navigate("/");
        } else if (responseText.includes("projects")) {
          navigate("/projects");
        } else if (responseText.includes("resources")) {
          navigate("/resources");
        } else if (responseText.includes("contact")) {
          navigate("/contact");
        } else if (responseText.includes("blogs")) {
          navigate("/blogs");
        } else if (responseText.includes("community")) {
          navigate("/community");
        } else if (responseText.includes("admin")) {
          navigate("/admin");
        }
      }

      setChatHistory([...newChatHistory, { sender: "bot", text: responseText }]);
    } catch (error) {
      console.error("Error generating content:", error);
      setChatHistory([...newChatHistory, { sender: "bot", text: "Sorry, I couldn't generate a response." }]);
    }
    setLoading(false);
    setUserInput("");
  };

  return (
    <div className="h-[120vh] min-w-full flex flex-col justify-end p-4 overflow-hidden">
      <div className="flex flex-col space-y-4 p-4 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="flex flex-col space-y-2 overflow-y-auto h-[100%]">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${message.sender === "user" ? "bg-blue-200 self-end" : "bg-gray-200"}`}
            >
              <span>{message.text}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleUserInput} className="flex items-center space-x-2 mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question..."
            className="p-2 rounded-lg border-gray-300 flex-1 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg" disabled={loading}>
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gemini;