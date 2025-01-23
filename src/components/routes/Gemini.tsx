import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Gemini = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ sender: string, text: string }[]>([]);

  const context = `Greet the user with hi`;

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
      <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
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