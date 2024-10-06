import React, { useEffect, useRef, useState } from 'react';

interface Project {
    name: string;
}

const CameraComponent: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:5000/'); // Adjust to your Flask server URL
                if (!response.ok) {
                    throw new Error('Failed to fetch projects');
                }
                const data = await response.json();
                setProjects(data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();

        const startVideo = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        };

        startVideo();

        const captureFrame = () => {
            if (canvasRef.current && videoRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                if (context) {
                    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob(async (blob) => {
                        if (blob) {
                            const formData = new FormData();
                            formData.append('image', blob, 'frame.jpg');

                            try {
                                const response = await fetch('http://localhost:5000/process_frame', {
                                    method: 'POST',
                                    body: formData,
                                });
                                const data = await response.json();
                                console.log(data);
                            } catch (error) {
                                console.error('Error processing frame:', error);
                            }
                        }
                    }, 'image/jpeg');
                }
            }
        };

        const intervalId = setInterval(captureFrame, 1000 / 30);

        return () => clearInterval(intervalId);
    }, []);

    const runProject = async (projectName: string) => {
        try {
            const response = await fetch(`http://localhost:5000/run/${projectName}`);
            const data = await response.json();
            if (response.ok) {
                console.log(data.message); // Display success message
            } else {
                console.error('Error running project:', data.error);
            }
        } catch (error) {
            console.error('Error running project:', error);
        }
    };

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} width={640} height={480} />

            <h2>Available Projects</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        {project.name}
                        <button onClick={() => runProject(project.name)}>Run Project</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CameraComponent;
