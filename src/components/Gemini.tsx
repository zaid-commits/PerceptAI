import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Gemini = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);
  const navigate = useNavigate();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();

  const baseContext = `
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

  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, "$1") 
      .replace(/\*([^*]+)\*/g, "$1") 
      .replace(/`([^`]+)`/g, "$1"); 
  };

  // Function to handle user input submission
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

      const userContext = user ? `The user's name is ${user.firstName || user.username || "User"}.` : "";

      const prompt = `${baseContext}\n${userContext}\nUser: ${userInput}\nBot:`;

      const result = await model.generateContent(prompt);
      const rawResponseText = result.response.text();
      const responseText = cleanMarkdown(rawResponseText); 

      const maxResponseLength = 500; 
      const truncatedResponseText = responseText.length > maxResponseLength
        ? responseText.substring(0, maxResponseLength) + "..."
        : responseText;

      const navigationMap: Record<string, string> = {
        home: "/",
        projects: "/projects",
        resources: "/resources",
        contact: "/contact",
        blogs: "/blogs",
        community: "/community",
        admin: "/admin",
      };

      for (const [key, path] of Object.entries(navigationMap)) {
        if (truncatedResponseText.toLowerCase().includes(`navigate to ${key}`)) {
          navigate(path);
          break;
        }
      }

      // Update chat history with bot response
      setChatHistory([...newChatHistory, { sender: "bot", text: truncatedResponseText }]);
    } catch (error) {
      console.error("Error generating content:", error);
      setChatHistory([
        ...newChatHistory,
        { sender: "bot", text: "Sorry, I couldn't generate a response." },
      ]);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="flex flex-col space-y-4 p-4 rounded-lg shadow-lg max-w-md mx-auto bg-gray-900 text-white overflow-hidden">
      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="flex flex-col space-y-2 overflow-y-auto bg-gray-800 h-[60vh] p-4 rounded-lg"
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.sender === "user"
                ? "bg-purple-700 text-white self-end"
                : "bg-gray-300 text-black"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

  
      <form onSubmit={handleUserInput} className="flex items-center space-x-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a question..."
          className="p-3 rounded-lg border border-gray-600 flex-1 bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Gemini;