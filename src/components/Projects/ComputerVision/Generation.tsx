import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane } from "react-icons/fa6";


function Generation() {
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<{ sender: string; text: string }[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const baseContext = `
    You are a chatbot for PerceptAI, an AI-infused vision directory with advanced AI & ML solutions including computer vision. you are especially trained to handle tasks and code generation related to computer vision. and other ai related tasks. you should help the user to generate code for their projects. you can help the user with the selection between approaches and all but explain them why it is the best appraoch then.
    
  
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

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;

        setLoading(true);

        const newChatHistory = [...chatHistory, { sender: "User", text: userInput }];
        setChatHistory(newChatHistory);

        try {
            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
            if (!apiKey) {
                throw new Error("API key is missing. Please set VITE_GOOGLE_API_KEY in the .env file.");
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const screenContext = getCurrentScreenContext();

            const prompt = `${baseContext}\nCurrent Screen Context: ${JSON.stringify(screenContext)}\nUser: ${userInput}\nBot:`;

            const result = await model.generateContent(prompt);
            const rawResponseText = result.response.text();
            const responseText = cleanMarkdown(rawResponseText);

            const maxResponseLength = 500;
            const truncatedResponseText =
                responseText.length > maxResponseLength ? responseText.substring(0, maxResponseLength) + "..." : responseText;

            setChatHistory([...newChatHistory, { sender: "AI", text: truncatedResponseText }]);
        } catch (error) {
            console.error("Error generating content:", error);
            setChatHistory([...newChatHistory, { sender: "AI", text: "Sorry, I couldn't generate a response." }]);
            toast.error("AI response failed!");
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
        <div className="min-h-screen flex flex-col items-center p-6  text-white">
            <ToastContainer />
            <h1 className="text-4xl font-bold">CodeHelper</h1>

            {/* AI Chatbot Section */}
            <div className="w-full max-w-3xl my-6 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl mb-4">Ask the AI (Code Generator)</h2>
                <div ref={chatContainerRef} className="h-64 overflow-y-auto border border-gray-600 p-3 rounded-md bg-gray-700">
                    {chatHistory.length > 0 ? (
                        chatHistory.map((msg, index) => (
                            <div key={index} className={`p-2 my-1 ${msg.sender === "User" ? "text-right" : "text-left"}`}>
                                <b className={msg.sender === "User" ? "text-blue-400" : "text-green-400"}>
                                    {msg.sender}:
                                </b>{" "}
                                {msg.text}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">Start a conversation...</p>
                    )}
                </div>
                <form onSubmit={sendMessage} className="flex mt-4">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                        placeholder="Ask something..."
                    />
                    <button
                        type="submit"
                        className="ml-2 px-4 py-2 bg-green-600 rounded-md hover:bg-green-500"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : <FaPaperPlane />}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Generation;
