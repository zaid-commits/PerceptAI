import React, { useEffect, useState } from "react";
import FloatingNavbar from "../Section1/Navbar/Navbar";

interface Blog {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  url: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
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
        <div className="headingWrapper mt-10">
          <h1 className="text-4xl font-bold text-center text-purple-900 px-10 py-8">
            PerceptAI Articles Library
          </h1>
        </div>
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
                <div className="flex items-center mt-4">
                  <img
                    src={blog.user.profile_image}
                    alt={`Profile of ${blog.user.name}`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-sm font-medium">{blog.user.name}</p>
                    <p className="text-xs text-gray-400">
                      {blog.user.username}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <a
                    href={`${blog.url}`}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    Read More..
                  </a>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
