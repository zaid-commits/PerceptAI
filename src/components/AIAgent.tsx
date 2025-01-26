import type React from "react"
import { useState, useRef, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useUser } from "@clerk/clerk-react"
import { FaPaperPlane, FaHistory, FaTrash, FaPlus, FaUser, FaRobot } from "react-icons/fa"
import FloatingNavbar from "./Navbar"

const AiAgent: React.FC = () => {
  const [userInput, setUserInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([])
  const [conversations, setConversations] = useState<{ id: number; title: string }[]>([{ id: 1, title: "New Chat" }])
  const [activeConversation, setActiveConversation] = useState(1)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { user } = useUser()

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
  
  Your job is to assist users with information about PerceptAI, help them navigate the website, and provide support for their queries. You can also help users find specific projects, resources, or blog posts, and guide them to the appropriate sections of the website whenever necessary.
  `

  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
  }

  const handleUserInput = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setLoading(true)

    const newChatHistory = [...chatHistory, { sender: "user", text: userInput }]
    setChatHistory(newChatHistory)

    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY
      if (!apiKey) {
        throw new Error("API key is missing. Please set VITE_GOOGLE_API_KEY in the .env file.")
      }

      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const userContext = user ? `The user's name is ${user.firstName || user.username || "User"}.` : ""

      const prompt = `${baseContext}\n${userContext}\nUser: ${userInput}\nBot:`

      const result = await model.generateContent(prompt)
      const rawResponseText = result.response.text()
      const responseText = cleanMarkdown(rawResponseText)

      const maxResponseLength = 500
      const truncatedResponseText =
        responseText.length > maxResponseLength ? responseText.substring(0, maxResponseLength) + "..." : responseText

      setChatHistory([...newChatHistory, { sender: "bot", text: truncatedResponseText }])

      // Update conversation title if it's a new chat
      if (conversations[activeConversation - 1] && conversations[activeConversation - 1].title === "New Chat") {
        const updatedConversations = [...conversations]
        updatedConversations[activeConversation - 1].title = userInput.substring(0, 30)
        setConversations(updatedConversations)
      }
    } catch (error) {
      console.error("Error generating content:", error)
      setChatHistory([...newChatHistory, { sender: "bot", text: "Sorry, I couldn't generate a response." }])
    } finally {
      setLoading(false)
      setUserInput("")
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatContainerRef]) 

  const startNewConversation = () => {
    setConversations([...conversations, { id: conversations.length + 1, title: "New Chat" }])
    setActiveConversation(conversations.length + 1)
    setChatHistory([])
  }

  const deleteConversation = (id: number) => {
    const updatedConversations = conversations.filter((conv) => conv.id !== id)
    setConversations(updatedConversations)
    if (activeConversation === id) {
      setActiveConversation(updatedConversations[0]?.id || 0)
      setChatHistory([])
    }
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <FloatingNavbar />
      {/* Sidebar */}
      <div className="w-64 bg-black p-4 flex flex-col border-r-2 border-gray-800">
        <button
          onClick={startNewConversation}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-4 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> New Chat
        </button>
        <div className="flex-grow overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer ${
                activeConversation === conv.id ? "bg-purple-700" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveConversation(conv.id)}
            >
              <div className="flex items-center">
                <FaHistory className="mr-2" />
                <span className="truncate">{conv.title}</span>
              </div>
              {conversations.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteConversation(conv.id)
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
          {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`p-3 rounded-lg mb-2 flex items-center ${
            message.sender === "user" ? "bg-black border-b-4 border-l-2 border-gray-700 self-end flex-row-reverse ml-auto" : "bg-black border-b-4 border-l-2 border-purple-800  text-white self-start"
          } max-w-[60%]`}
          style={{ maxWidth: message.text.length < 40 ? "fit-content" : "60%" }}
        >
          {message.sender === "user" ? <FaUser className="ml-2" /> : <FaRobot className="mr-2" />}
          <span className="break-words">{message.text}</span>
        </div>
          ))}
        </div>

        <form onSubmit={handleUserInput} className="p-4 border-t-gray-800 border-t-2">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 p-3 rounded-lg bg-black text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                <FaPaperPlane />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AiAgent
