import Gemini from '../Gemini';
import { useState } from 'react';
import { FaComments } from 'react-icons/fa';

const Navigator = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed bottom-16 right-4 bg-black p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <Gemini />
        </div>
      )}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-purple-800 text-white p-3 rounded-full shadow-lg focus:outline-none"
      >
        <FaComments size={24} />
      </button>
    </div>
  );
};

export default Navigator;