import Gemini from "../Gemini";
import { useState } from "react";
import { FaComments } from "react-icons/fa";

const Navigator = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Chat widget */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 bg-gray-900 text-white w-80 h-[80vh] rounded-lg shadow-lg overflow-hidden flex flex-col"
        >
          <div className="bg-purple-800 p-3 flex justify-between items-center">
            <span className="text-lg font-bold">PercepAI Chatbot</span>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <div className="flex-1">
            <Gemini />
          </div>
        </div>
      )}

      {/* Floating chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-purple text-white p-3 rounded-full shadow-lg focus:outline-none"
      >
        <FaComments size={24} />
      </button>
    </div>
  );
};

export default Navigator;
