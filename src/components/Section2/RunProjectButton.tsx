import React from 'react';

interface RunProjectButtonProps {
  projectName: string;
}

const RunProjectButton: React.FC<RunProjectButtonProps> = ({ projectName }) => {
  const handleRunProject = async () => {
    try {
      const response = await fetch(`https://ts-backend-6swe.onrender.com/run/${projectName}`);
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.error); 
      }
    } catch (error) {
      console.error('Error running project:', error);
      alert('Failed to run the project. Please try again.');
    }
  };

  return (
    <button
      onClick={handleRunProject}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Run {projectName}
    </button>
  );
};

export default RunProjectButton;
