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
        <div className="fixed bottom-20 right-4 bg-[#0c0c0c] text-white w-96 h-[70vh] rounded-lg shadow-lg overflow-hidden flex flex-col border border-gray-800">
          <div className="bg-[#0c0c0c] p-4 flex justify-between items-center border-b border-gray-800">
            <span className="text-lg font-bold">PerceptAI Chat</span>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-300 transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Gemini />
          </div>
        </div>
      )}

      {/* Floating chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-purple-800 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors focus:outline-none"
      >
        <FaComments size={24} />
      </button>
    </div>
  );
};

export default Navigator;