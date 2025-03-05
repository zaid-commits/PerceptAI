import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { FaPaperPlane } from "react-icons/fa6";

const Gemini = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string; link?: string }[]>([]);
  const [conversations, setConversations] = useState<{ id: number; title: string }[]>([{ id: 1, title: "New Chat" }]);
  const [activeConversation] = useState(1); // setActiveConversation
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

  The email of the platform is engineering.zaidrakhange@gmail.com
  `;

  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1");
  };

  const getCurrentScreenContext = () => {
    const url = window.location.href;
    const title = document.title;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    return { url, title, description };
  };

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
      const screenContext = getCurrentScreenContext();

      const prompt = `${baseContext}\n${userContext}\nCurrent Screen Context: ${JSON.stringify(screenContext)}\nUser: ${userInput}\nBot:`;

      const result = await model.generateContent(prompt);
      const rawResponseText = result.response.text();
      const responseText = cleanMarkdown(rawResponseText);

      const maxResponseLength = 500;
      const truncatedResponseText =
        responseText.length > maxResponseLength ? responseText.substring(0, maxResponseLength) + "..." : responseText;

      setChatHistory([...newChatHistory, { sender: "bot", text: truncatedResponseText }]);

      // Update conversation title if it's a new chat
      if (conversations[activeConversation - 1] && conversations[activeConversation - 1].title === "New Chat") {
        const updatedConversations = [...conversations];
        updatedConversations[activeConversation - 1].title = userInput.substring(0, 30);
        setConversations(updatedConversations);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setChatHistory([...newChatHistory, { sender: "bot", text: "Sorry, I couldn't generate a response." }]);
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

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat History */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-purple-800 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              <span>{message.text}</span>
              {message.link && (
                <button
                  onClick={() => message.link && handleNavigation(message.link)}
                  className="text-blue-400 underline mt-2 block"
                >
                  Open detailed view
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleUserInput} className="p-4 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 p-3 rounded-lg bg-[#0c0c0c] border border-gray-800 text-white focus:outline-none focus:border-purple-800"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-purple-800 text-white p-3 rounded-lg hover:bg-purple-700 transition-colors"
            disabled={loading}
          >
            {loading ? "..." : <FaPaperPlane />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Gemini;