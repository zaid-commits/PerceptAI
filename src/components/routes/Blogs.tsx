import React, { useEffect, useState } from "react";
import FloatingNavbar from "../Section1/Navbar/Navbar";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://dev.to/api/articles");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <FloatingNavbar />
      <div className="container mx-auto px-4 py-8 bg-black">
        <h1 className="text-4xl font-bold text-center py-12 ">
          Computer Vision Articles
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {blogs.map((blog) =>
            blog.cover_image ? (
              <div
                key={blog.id}
                className="bg-black text-white p-6 rounded-lg shadow-lg"
              >
                <img
                  src={blog.cover_image}
                  alt={`Img not found for ${blog.id}`}
                  className="mt-4"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <h2 className="text-2xl font-bold mt-4 mb-6">{blog.title}</h2>
                <p className="text-gray-400 mb-4">{blog.description}</p>
                <a
                  href={`${blog.url}`}
                  target="_blank"
                  className="text-blue-500 hover:underline"
                >
                  Click to read full article
                </a>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
