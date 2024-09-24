import React from 'react';

const RunProjectButton = ({ projectName }) => {
  const handleRunProject = async () => {
    try {
      const response = await fetch(`http://localhost:5000/run/${projectName}`);
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
