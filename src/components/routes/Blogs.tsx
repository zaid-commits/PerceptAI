import React, { useEffect, useState } from "react";
import FloatingNavbar from "../Section1/Navbar/Navbar";
import Loader from "../elements/Loader";
import Footer from "../Footer";
import Promo from "../Section5/promo";
import { FaBookReader } from "react-icons/fa";


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
                const response = await fetch("https://dev.to/api/articles/latest?tag=opencv&tag=computervision&tag=machinelearning");
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error("Error fetching computer vision blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const truncateTitle = (title: string) => {
        const words = title.split(" ");
        if (words.length > 8) {
            return words.slice(0, 8).join(" ") + "...";
        }
        return title;
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="bg-[#161818]">
            <FloatingNavbar />
            <div className="container mx-auto px-4 py-8 ">
                <div className="headingWrapper mt-20 mb-8 py-8" >
                    <h1 className="text-4xl font-bold text-center text-purple-800 px-10  uppercase">
                        PerceptAI Articles Library
                    </h1>
                    <p className="text-center text-gray-400 mt-3">Discover amazing Articles from our community or share your own Articles with the world.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-20 ">
                    {blogs.map((blog) => (
                        blog.cover_image ? (
                            <div
                                key={blog.id}
                                className="bg-[#ffffff20] text-white p-6 rounded-3xl shadow-lg border border-[#8080809e]"
                            >
                                <img
                                    src={blog.cover_image}
                                    alt={`Img not found for ${blog.id}`}
                                    className="mt-4 rounded-2xl"
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                                <h2 className="text-xl font-semibold mt-4 mb-2 leading-tight">
                                    {truncateTitle(blog.title)}
                                </h2>
                                <p className="text-gray-400 mb-4 text-sm">{blog.description}</p>
                                <div className="flex items-center mt-4 justify-between bg-[#ffffff34] border border-[#80808099] rounded-2xl p-2">
                                    <div className="flex items-center justify-around">
                                        <img
                                            src={blog.user.profile_image}
                                            alt={`Profile of ${blog.user.name}`}
                                            className="w-10 h-10 rounded-full mr-4 border border-b-4 border-purple-700"
                                        />
                                        <div>
                                            <p className="text-sm font-medium">{blog.user.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {blog.user.username}
                                            </p>

                                        </div>
                                    </div>
                                    <div className="mr-2">
                                        <a
                                            href={`${blog.url}`}
                                            target="_blank"
                                            className=" hover:underline"
                                        >
                                            {/* Read More.. */}
                                            <FaBookReader />

                                        </a>
                                    </div>
                                </div>
                           
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
            <Promo />
            <Footer />
        </div>
    );
};

export default Blogs;

