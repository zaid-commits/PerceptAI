import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5050"; // Change if backend runs on a different port

function Generation() {
    interface ChatMessage {
        sender: "User" | "AI";
        text: string;
    }

    const [userInput, setUserInput] = useState<string>("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    // Function to send chat messages to AI
    const sendMessage = async () => {
        if (!userInput.trim()) return;

        setChatHistory([...chatHistory, { sender: "User", text: userInput }]);
        setUserInput("");

        try {
            const res = await axios.post(`${API_URL}/chat`, { user_input: userInput });
            setChatHistory([...chatHistory, { sender: "User", text: userInput }, { sender: "AI", text: res.data.response }]);
        } catch (error) {
            toast.error("AI response failed!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white">
            <ToastContainer />
            <h1 className="text-3xl font-bold">OpenCV AI Hub</h1>

            {/* AI Chatbot Section */}
            <div className="w-full max-w-3xl my-6 p-4 bg-gray-800 rounded-lg">
                <h2 className="text-2xl mb-4">Ask the AI (Code Generator)</h2>
                <div className="h-64 overflow-y-auto border border-gray-600 p-3 rounded-md bg-gray-700">
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
                <div className="flex mt-4">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                        placeholder="Ask something..."
                    />
                    <button
                        onClick={sendMessage}
                        className="ml-2 px-4 py-2 bg-green-600 rounded-md hover:bg-green-500"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Generation;
