import React from 'react';
import ProjectCard from '../Card/ProjectCard';

// Define the type for a project object
interface Project {
  title: string;
  author: string;
  description: string;
  category: string;
  stars: number;
  forks: number;
  imageUrl: string;
}

// Define the projects array with the Project type
const projects: Project[] = [
  {
    title: "Gesture Presentation Control",
    author: "Zaid Rakhange",
    description: "Control presentations with hand gestures using OpenCV.",
    category: "OpenCV",
    stars: 154,
    forks: 23,
    imageUrl: "https://blog.emb.global/wp-content/uploads/2024/01/The-Future-of-Gesture-Control-Technology.webp"
  }, {
    title: "Object Detection",
    author: "Zaid Rakhange",
    description: "Real-time object detection using OpenCV.",
    category: "OpenCV",
    stars: 154,
    forks: 23,
    imageUrl: "https://cdn.analyticsvidhya.com/wp-content/uploads/2019/08/real_time_object_detection.jpg"
  }, {
    title: "Virtual Paint",
    author: "Zaid Rakhange",
    description: "Create art with hand gestures using OpenCV.",
    category: "OpenCV",
    stars: 154,
    forks: 23,
    imageUrl: "https://media.licdn.com/dms/image/D5612AQGys8i58XR67g/article-cover_image-shrink_720_1280/0/1698330135309?e=2147483647&v=beta&t=99uyKHEjI3erTpJZTmNvo5_UBRStAcSRL7tunS9qgAg"
  }, {
    title: "AI Maths Solver",
    author: "Zaid Rakhange",
    description: "AI-powered math solver using computer vision.",
    category: "OpenCV",
    stars: 154,
    forks: 23,
    imageUrl: "https://math-ai.org/wp-content/uploads/2024/08/AI-Math-Solver-Powered-by-MathGPT.webp"
  }, {
    title: "Face Recognition",
    author: "Zaid Rakhange",
    description: "Advanced face recognition using OpenCV.",
    category: "OpenCV",
    stars: 154,
    forks: 23,
    imageUrl: "https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202203/face-600x900.png?itok=4wm2x8C2"
  }, {
    title: "Hand Tracking",
    author: "Zaid Rakhange",
    description: "High accuracy Hand Tracking using OpenCV.",
    category: "OpenCV",
    stars: 154,
    forks: 23,
    imageUrl: "https://i.ytimg.com/vi/qAw5tuYgVec/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCgFsmn23tCnNhzX59fsFM1OS5t8Q"
  }
];

const ProjectGrid: React.FC = () => {
  return (
    <div id='featuredProjects' className="min-h-screen bg-black text-white p-6">
      <h1 className="heading text-4xl mt-14 py-6 font-bold mb-4 text-center">Featured <span className='text-purple-700'>Projects</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGrid;
