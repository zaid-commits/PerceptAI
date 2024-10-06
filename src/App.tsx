import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ProjectResponse {
  projects: string[];
}

interface RunProjectResponse {
  output: string;
  error: string;
}

const App: React.FC = () => {
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<ProjectResponse>('http://localhost:5000/projects');
        setProjects(response.data.projects);
      } catch (err) {
        setError('Failed to fetch projects.');
      }
    };
    fetchProjects();
  }, []);

  const runProject = async () => {
    try {
      const response = await axios.post<RunProjectResponse>(`http://localhost:5000/run_project/${selectedProject}`);
      setOutput(response.data.output);
      setError(response.data.error);
    } catch (err) {
      setError('Failed to run the project.');
    }
  };

  return (
    <div>
      <h1>Run Python Project</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
      </select>
      <button onClick={runProject} disabled={!selectedProject}>Run</button>
      <h2>Output</h2>
      <pre>{output}</pre>
      <h2>Error</h2>
      <pre>{error}</pre>
    </div>
  );
}

export default App;